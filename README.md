# Lim Wee Han — Immersive Media portfolio

A Japanese-inspired, cinematic portfolio built with Vite, React, TypeScript, Tailwind CSS
and Framer Motion. Static output, deploys to GitHub Pages automatically.

## Hero 3D model

The hero renders a real-time 3D model with three.js (`src/components/hero3d/`).

- Current model: **Littlest Tokyo** by Glen Fox (https://artstation.com/artwork/1AGwX),
  licensed **CC BY 4.0**. Credit is shown in the footer and must stay there while the model is used.
  It was optimised with gltf-transform (meshopt geometry, WebP textures): 4.1 MB → 2.7 MB.
- Swap in your own model: export `.glb` from Blender or Maya, then run
  `npx gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 1024`
  and replace `src/assets/models/littlest-tokyo.glb` (or change the import in `HeroModel.tsx`).
  Update `credits` in `src/data/projects.ts` too.
- Framing (size, position, camera distance) lives in the `frame()` function in `createHeroScene.ts`.
- The colour grade is a CSS filter on the canvas in `HeroModel.tsx` (`saturate(.62)` etc).
- The model turns slowly on its own (about one full turn every 40s, `SPIN_SPEED` in createHeroScene.ts).
- Reduced motion renders a single still frame. The scene pauses when scrolled off screen.

Why Vite instead of Next.js: the site is fully static, so Vite gives the same React + TypeScript
setup with simpler GitHub Pages hosting and a one-file preview build. Three.js was left out on
purpose: the 3D feel comes from layered SVG, CSS 3D and parallax, which keeps it fast on phones.
Add `@react-three/fiber` later if you want real models in the 3D showcase.

## Quick start

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # production build in /dist
npm run preview       # serve the build locally
npm run lint          # type-check + ESLint
npm run build:single  # one self-contained dist/index.html for sharing a preview
```

Open the folder in VS Code and accept the recommended extensions.

## Where things live

```
src/
  data/projects.ts        ALL content: site info, projects, process, 3D showcase, skills, lab, socials
  data/art.ts             generated placeholder artwork + asset() path helper
  components/             one file per section (Hero, ProjectGallery, ProjectCaseStudy, Garden…)
  hooks/                  media queries and active-section tracking
  styles/index.css        palette tokens, paper grain, shared classes
public/media/             your real images, videos and models
```

## Add or edit a project

Add an object to `projects` in `src/data/projects.ts`. Every case-study section
(overview, role, tools, challenge, process, design, result, reflection, gallery) is a field.

- `cover`: `'media/my-project.jpg'`
- `galleryMode`: `'tilt'` for 3D work (pointer tilt), `'scroll'` for UI mockups (sideways strip),
  `'video'` for games (first item full width)
- `gallery` items: `{ type: 'image', src, alt }`, `{ type: 'video', src, poster, alt }`,
  `{ type: 'embed', url, title }`
- `kanji`: decorative only, never needed to understand the page

Each project gets a shareable link: `?project=ar-aquarium`.

## Placeholders to replace

- Project years, roles, tools and case-study text (written as believable placeholders)
- All artwork: covers, gallery, lab cards and the about portrait (currently generated)
- LinkedIn, ArtStation, GitHub and Instagram handles in `socials`
- `public/og-image.png`, a 1200×630 share image

## Type and colour

- Display: **Gloock** (bundled from `@fontsource/gloock`, Latin only). One weight; never set it bold.
- Body: **Zen Kaku Gothic New** (bundled Latin subsets).
- Japanese glyphs: **Shippori Mincho B1** and **Yuji Syuku** (brush) from Google Fonts, requested with a
  `text=` parameter so only the characters the site uses are downloaded. If you add new Japanese text,
  add those characters to the `text=` list in `index.html`.
- Rice-paper sections: add the class `on-paper` to any section. It flips the palette (ink on washi
  paper, with a fibre texture) without touching any component classes. Process and Lab use it.
- Atmosphere utilities in `styles/index.css`: `bg-genko` (manuscript-paper grid), `bg-inkwash`,
  `bg-seigaiha` (wave pattern), `bg-sunrise`.

## Motion system

- Smooth inertial scrolling: Lenis (`src/lib/smooth.ts`). Mouse and trackpad only; touch stays native.
  Anything that must scroll on its own (case studies, menus) carries `data-lenis-prevent`.
- Kinetic type bands: `VelocityMarquee` runs right at 4x speed while you scroll down and left at
  0.5x while you scroll up, easing smoothly between the two (constants at the top of the file).
- Labels decode from katakana the first time they appear: `DecodeText`.
- Project images: shoji-slat reveal, and a slight skew that follows scroll speed (`useScrollSkew`).
- Hero: letter-by-letter entrance; the 3D model rises out of the fog and swings into place.
- Contact headline letters lift toward the pointer: `ProximityText`.
- Clicking anywhere leaves a small crimson ink ripple (custom cursor, desktop only).
- Lab cards are dealt onto the table when the section appears.
- Page load is one orchestrated sequence: loader, mask reveal, logo, nav items, hero letters,
  3D model, then the position marks.
- All of it switches off with `prefers-reduced-motion`.

## Hidden details

- Click any faint Japanese characters for an ink splash
- Press the small red seal in the footer
- Hover the logo

## Phones

- Hero stacks on phones: the 3D model gets its own band above the name, so nothing overlaps.
  Data-saver mode or low-memory phones skip the 3D model entirely.
- Smooth scrolling, the cursor, the grain overlay, parallax, pinned sections, slat reveals and
  scroll-skew are desktop-only; phones keep native scrolling and get lighter reveals.
- The header gets a solid backing once you scroll so it never sits on top of text.
- Tap targets are at least 44px where it matters (menu, close, project links).

## Motion and accessibility

- `prefers-reduced-motion` turns off parallax, pinned sections, particles and wipes
- Below 1024px wide, horizontal and pinned sections become vertical, the cursor turns off,
  and particles are skipped
- Every section is reachable by keyboard; case studies close with Esc

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub: Settings > Pages > Source: GitHub Actions. Each push to `main` deploys to
`https://<your-username>.github.io/<repo-name>/`.
