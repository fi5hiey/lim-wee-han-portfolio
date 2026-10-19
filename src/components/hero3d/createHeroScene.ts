import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface HeroSceneOptions {
  canvas: HTMLCanvasElement;
  modelUrl: string;
  reducedMotion: boolean;
  /** 'side': model to the right of the headline. 'stacked': model centred in its own band (phones). */
  layout: 'side' | 'stacked';
  /** 0 at the top of the hero, 1 once it has scrolled away */
  getScroll: () => number;
  onLoaded?: () => void;
  onError?: (e: unknown) => void;
}

/** Decode a data: URI into an ArrayBuffer so single-file builds never need a network fetch. */
function dataUriToBuffer(uri: string): ArrayBuffer {
  const b64 = uri.slice(uri.indexOf(',') + 1);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

/**
 * Plain three.js scene for the hero: one model, soft studio light, a crimson rim,
 * fog that melts the edges into the page, pointer parallax and scroll rotation.
 * Returns a cleanup function.
 */
export function createHeroScene(opts: HeroSceneOptions): () => void {
  const { canvas, modelUrl, reducedMotion, getScroll, layout } = opts;
  const small = window.matchMedia('(max-width: 767px)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(new THREE.Color('#111110'), 10, 30);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;

  const key = new THREE.DirectionalLight('#ffe6cc', 2.2);
  key.position.set(-4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#c84a40', 3.2);
  rim.position.set(5, 2, -6);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight('#d9d2c4', '#141414', 0.35));

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const pivot = new THREE.Group(); // receives pointer + scroll rotation
  const holder = new THREE.Group(); // framing offset per aspect ratio
  holder.add(pivot);
  scene.add(holder);

  let mixer: THREE.AnimationMixer | null = null;
  const clock = new THREE.Clock();
  let raf = 0;
  let running = false;
  let disposed = false;
  let loaded = false;
  let pointerX = 0;
  let pointerY = 0;
  let rotY = -0.55;
  let spin = 0; // continuous turntable angle (radians)
  const SPIN_SPEED = 0.16; // rad/s, about one full turn every 40 seconds
  let rotX = 0;
  let intro = reducedMotion ? 1 : 0;

  const frame = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    if (layout === 'side') {
      holder.position.set(2.3, 0.25, 0);
      camera.position.set(0, 1.4, 13);
      camera.lookAt(0.6, 0.2, 0);
    } else {
      // Fit the model inside its band whatever the phone's shape
      holder.position.set(0, -0.1, 0);
      camera.position.set(0, 1.2, camera.aspect < 1 ? 13 / camera.aspect : 10.5);
      camera.lookAt(0, 0.1, 0);
    }
    camera.updateProjectionMatrix();
  };

  const render = () => renderer.render(scene, camera);

  const tick = () => {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const s = getScroll();
    if (mixer) mixer.update(dt * 0.6);
    intro = Math.min(1, intro + dt / 2.6);
    const e = 1 - Math.pow(1 - intro, 4);
    spin += dt * SPIN_SPEED;
    const targetY = -0.55 + spin + pointerX * 0.28 + s * 1.1 + (1 - e) * 0.9;
    const targetX = pointerY * 0.06 + s * 0.12;
    rotY += (targetY - rotY) * (intro < 1 ? 0.12 : 0.04);
    rotX += (targetX - rotX) * 0.04;
    pivot.rotation.set(rotX, rotY, 0);
    pivot.position.y = Math.sin(t * 0.5) * 0.06 - s * 0.6 - (1 - e) * 1.6;
    pivot.scale.setScalar(0.88 + e * 0.12);
    render();
    raf = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || disposed || reducedMotion || !loaded) return;
    running = true;
    clock.getDelta();
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const onGltf = (gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }) => {
    if (disposed) return;
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 5.2 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);
    model.position.copy(center).multiplyScalar(-scale);
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      mats.forEach((m) => {
        if ('envMapIntensity' in m) (m as THREE.MeshStandardMaterial).envMapIntensity = 0.8;
      });
    });
    pivot.add(model);
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();
    }
    pivot.rotation.y = rotY;
    loaded = true;
    frame();
    if (reducedMotion) mixer?.update(2);
    render();
    opts.onLoaded?.();
    start();
  };
  const onError = (e: unknown) => opts.onError?.(e);
  if (modelUrl.startsWith('data:')) {
    loader.parse(dataUriToBuffer(modelUrl), '', onGltf, onError);
  } else {
    loader.load(modelUrl, onGltf, undefined, onError);
  }

  const onPointer = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onResize = () => {
    frame();
    if (!running && loaded) render();
  };
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
  io.observe(canvas);
  const onVisibility = () => (document.hidden ? stop() : start());
  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) window.addEventListener('pointermove', onPointer);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  frame();

  return () => {
    disposed = true;
    stop();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      mats.forEach((m) => {
        Object.values(m).forEach((v) => v instanceof THREE.Texture && v.dispose());
        m.dispose();
      });
    });
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}
