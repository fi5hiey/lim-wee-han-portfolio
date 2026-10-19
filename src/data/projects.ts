import { art } from './art';

/**
 * ALL site content lives in this file. Change copy, add projects, swap media here.
 * Media paths: put files in /public/media and use 'media/file.jpg'.
 */

export const site = {
  name: 'Lim Wee Han',
  role: 'Immersive Media Designer',
  roles: ['3D', 'Interaction', 'Storytelling'],
  statement: 'I turn stories into interactive worlds.',
  email: 'limweehan2906@gmail.com',
  year: 2026,
};

export type Category = '3D' | 'GAME' | 'UIUX' | 'IMMERSIVE' | 'WEB';

export type MediaItem =
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'video'; src: string; poster?: string; alt: string; caption?: string }
  | { type: 'embed'; url: string; title: string; caption?: string };

export interface Project {
  id: string;
  title: string;
  categories: Category[];
  kanji: string; // decorative only
  summary: string;
  year: number;
  role: string;
  tools: string[];
  cover: string;
  /** How the case-study gallery behaves: 'tilt' for 3D, 'scroll' for UI mockups, 'video' for games */
  galleryMode: 'tilt' | 'scroll' | 'video';
  overview: string;
  challenge: string;
  process: string[];
  design: string;
  result: string;
  reflection: string;
  gallery: MediaItem[];
}

export const projects: Project[] = [
  {
    id: 'ar-aquarium',
    title: 'AR Aquarium',
    categories: ['IMMERSIVE', '3D'],
    kanji: '水槽',
    summary: 'An aquarium that lives on any table. Point a phone at a surface and a tank of koi swims into the room.',
    year: 2025,
    role: 'Concept, 3D and interaction',
    tools: ['Unity', 'AR Foundation', 'Blender', 'Photoshop'],
    cover: art('aquarium'),
    galleryMode: 'tilt',
    overview: 'A mobile AR experience that places a living aquarium in the real world. Fish react to the viewer: they gather when you get close and scatter when you tap the glass.',
    challenge: 'Making digital fish feel like they belong in a real room, on a phone, without the frame rate dropping.',
    process: ['Sketched fish behaviours before any modelling', 'Built low-poly koi in Blender with hand-painted textures', 'Prototyped surface placement and scale in Unity', 'Tuned schooling behaviour until it felt calm rather than busy'],
    design: 'Muted water, warm fish and soft caustic light keep attention on the movement rather than the effects.',
    result: 'A stable AR scene that runs smoothly on mid-range phones, with fish that respond to touch and distance.',
    reflection: 'Small reactions did more for presence than extra detail. A fish turning to look at you beats a higher polygon count.',
    gallery: [
      { type: 'image', src: art('aquarium'), alt: 'Koi swimming inside the AR tank', caption: 'Placement view' },
      { type: 'image', src: art('environments'), alt: 'Lighting study for the tank interior', caption: 'Lighting study' },
    ],
  },
  {
    id: 'urban-futures',
    title: 'Urban Futures',
    categories: ['IMMERSIVE'],
    kanji: '都市',
    summary: 'A VR walk through a city that does not exist yet, built to help people discuss how their neighbourhood could change.',
    year: 2025,
    role: 'Experience design and world building',
    tools: ['CoSpaces', 'Blender', 'Illustrator'],
    cover: art('urban'),
    galleryMode: 'tilt',
    overview: 'An urban planning experience in CoSpaces. Visitors move between three versions of the same district and vote on which future they would rather live in.',
    challenge: 'Turning planning ideas like density and green space into something people could feel in a few minutes.',
    process: ['Mapped the district into a simple block grid', 'Designed three futures with the same street layout', 'Added guided viewpoints so first-time VR users never felt lost', 'Tested with classmates and shortened every route'],
    design: 'An isometric, model-like look so the city reads as a proposal, not a finished place.',
    result: 'A short, guided VR tour that sparked more specific discussion than the same ideas on slides.',
    reflection: 'People trust what they can walk through. The voting mattered less than the walking.',
    gallery: [
      { type: 'image', src: art('urban'), alt: 'Isometric view of the district', caption: 'District overview' },
      { type: 'image', src: art('uiux'), alt: 'Voting interface concept', caption: 'Voting interface' },
    ],
  },
  {
    id: 'fish-clicker',
    title: 'Fish Clicker',
    categories: ['GAME'],
    kanji: '魚',
    summary: 'An incremental game about one very patient fisherman. Tap, upgrade, and watch the pond fill up.',
    year: 2024,
    role: 'Game design and development',
    tools: ['Unity', 'C#', 'Illustrator'],
    cover: art('fishclicker'),
    galleryMode: 'video',
    overview: 'A clicker game built in Unity with a calm, ink-drawn look. Each upgrade changes the pond visually so progress is something you can see, not just a number.',
    challenge: 'Keeping a clicker game satisfying past the first five minutes without making it noisy.',
    process: ['Designed the upgrade curve on paper first', 'Built the core loop and saving in Unity', 'Drew every fish as a two-colour ink illustration', 'Added small feedback: ripples, sounds and number pops'],
    design: 'Paper, ink and a single red accent. The calm look is the joke: a frantic genre made peaceful.',
    result: 'A complete, playable game with saving, twelve upgrades and a pond that visibly evolves.',
    reflection: 'Feedback is the whole game in a clicker. I spent more time on the ripple than on the economy, and it showed.',
    gallery: [
      { type: 'video', src: '', poster: art('fishclicker'), alt: 'Gameplay capture', caption: 'Gameplay' },
      { type: 'image', src: art('fishclicker'), alt: 'Main game screen', caption: 'Main screen' },
    ],
  },
  {
    id: 'medieval-world',
    title: 'Medieval World',
    categories: ['3D'],
    kanji: '城',
    summary: 'A stylised hillside kingdom: a castle, a village and the mist between them.',
    year: 2024,
    role: '3D environment and assets',
    tools: ['Maya', 'ZBrush', 'Substance Painter', 'Unity'],
    cover: art('medieval'),
    galleryMode: 'tilt',
    overview: 'A stylised 3D environment built around one view: a castle on a ridge at dusk. Every asset was made to support that composition.',
    challenge: 'Building a believable world with a small asset kit and keeping it readable from far away.',
    process: ['Blocked the scene with grey boxes to lock the silhouette', 'Sculpted hero assets in ZBrush', 'Built a modular kit for walls and roofs in Maya', 'Lit for dusk and added layered fog for depth'],
    design: 'Simple shapes, strong silhouettes and a low sun so the castle reads instantly.',
    result: 'A finished environment with a reusable modular kit and a set of cinematic stills.',
    reflection: 'Composition first, detail second. Most of the mood came from fog and light, not geometry.',
    gallery: [
      { type: 'image', src: art('medieval'), alt: 'Castle on the ridge at dusk', caption: 'Hero view' },
      { type: 'image', src: art('environments'), alt: 'Modular asset kit', caption: 'Asset kit' },
    ],
  },
  {
    id: 'personal-environments',
    title: 'Personal 3D Environments',
    categories: ['3D'],
    kanji: '風景',
    summary: 'Small worlds made for no reason except to find out what they feel like.',
    year: 2025,
    role: 'Everything',
    tools: ['Blender', 'Maya', 'Photoshop'],
    cover: art('environments'),
    galleryMode: 'tilt',
    overview: 'An ongoing series of quick environment studies: floating islands, quiet interiors, places at different times of day.',
    challenge: 'Finishing something every few weeks, so the series stays loose and experimental.',
    process: ['Pick one mood and one constraint', 'Block out in under an hour', 'Spend the rest of the time on light'],
    design: 'Each piece is limited to a few colours, which keeps the series consistent.',
    result: 'A growing collection of environments that act as a testing ground for bigger projects.',
    reflection: 'Constraints make it easier to start. The best pieces came from the tightest limits.',
    gallery: [
      { type: 'image', src: art('environments'), alt: 'Floating islands at night', caption: 'Floating islands' },
      { type: 'image', src: art('medieval'), alt: 'Dusk landscape study', caption: 'Dusk study' },
    ],
  },
  {
    id: 'uiux-experiments',
    title: 'UI/UX Experiments',
    categories: ['UIUX', 'WEB'],
    kanji: '画面',
    summary: 'Interfaces that try to feel like objects: dials, panels and screens with weight.',
    year: 2025,
    role: 'Interface and interaction design',
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    cover: art('uiux'),
    galleryMode: 'scroll',
    overview: 'A set of interface studies exploring tactile, physical-feeling controls for apps and games.',
    challenge: 'Making controls feel physical on a flat screen without falling back on skeuomorphism.',
    process: ['Collected references from cameras, train signage and audio gear', 'Designed controls in Figma', 'Built the best ones as small web prototypes'],
    design: 'Paper and charcoal surfaces, one red action per screen, and motion that responds to the hand.',
    result: 'A library of interface patterns and coded prototypes ready to reuse.',
    reflection: 'Good interaction is mostly timing. The same dial felt cheap or premium depending on 80 milliseconds.',
    gallery: [
      { type: 'image', src: art('uiux'), alt: 'Panel and dial mockups', caption: 'Panels' },
      { type: 'image', src: art('uiconcept'), alt: 'Timer dial concept', caption: 'Timer dial' },
      { type: 'image', src: art('ar'), alt: 'AR interface overlay', caption: 'AR overlay' },
    ],
  },
];

export const processSteps = [
  { n: '01', title: 'Idea', body: 'Start with a feeling I want someone to have, not a feature list.' },
  { n: '02', title: 'Story', body: 'Decide who the visitor is, where they begin and what they discover.' },
  { n: '03', title: 'Design', body: 'Sketch the world, the interface and the mood until they agree with each other.' },
  { n: '04', title: 'Build', body: 'Model, code and assemble the smallest version that can be played.' },
  { n: '05', title: 'Interaction', body: 'Tune how the world answers the visitor: timing, feedback, sound.' },
  { n: '06', title: 'Refine', body: 'Test with real people, cut what confuses them, polish what delights them.' },
];

export const showcase = [
  { key: 'ENVIRONMENT', note: 'Floating islands, kit-bashed in Blender' },
  { key: 'PROPS', note: 'Stone lantern, hand-painted textures' },
  { key: 'CHARACTERS', note: 'Stylised creature, sculpted in ZBrush' },
  { key: 'MATERIALS', note: 'Lacquer, stone and paper studies' },
  { key: 'LIGHTING', note: 'Dusk light and volumetric fog' },
];

export const skills: { group: string; items: string[] }[] = [
  { group: '3D Modelling', items: ['Maya', 'Blender', 'ZBrush'] },
  { group: 'Design', items: ['Photoshop', 'Illustrator', 'After Effects'] },
  { group: 'Development', items: ['Unity', 'HTML', 'CSS', 'JavaScript', 'Python'] },
  { group: 'Interaction', items: ['UI/UX', 'AR', 'VR', 'Game design'] },
];

export const labItems = [
  { title: 'Ripple shader', type: 'Shader experiment', art: art('shader') },
  { title: 'Tabletop cube', type: 'AR prototype', art: art('ar') },
  { title: 'Creature taming loop', type: 'Game mechanic, Roblox', art: art('creature') },
  { title: 'Arc and squash', type: 'Animation test', art: art('animation') },
  { title: 'Brush studies', type: 'Visual experiment', art: art('sketch') },
  { title: 'Timer dial', type: 'UI concept', art: art('uiconcept') },
  { title: 'Shoji grid', type: '3D experiment', art: art('visual') },
];

// Add more profiles here (ArtStation, Instagram...) as { label, href, value }
export const socials = [
  { label: 'Email', href: `mailto:${site.email}`, value: site.email },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lim-wee-han-324882249/',
    value: '/in/lim-wee-han',
  },
  { label: 'GitHub', href: 'https://github.com/fi5hiey', value: '@fi5hiey' },
];

// Third-party assets used on the site. Keep these credits visible: the licences require it.
export const credits = [
  {
    work: 'Littlest Tokyo',
    workHref: 'https://artstation.com/artwork/1AGwX',
    author: 'Glen Fox',
    authorHref: 'https://artstation.com/glenatron',
    license: 'CC BY 4.0',
    licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
    note: 'Hero 3D model, optimised and colour-graded',
  },
];
