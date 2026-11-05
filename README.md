# Muhammad Arham — Portfolio

Personal portfolio of Muhammad Arham, web developer from Karachi.

## Stack
- React 19 + Vite
- Tailwind CSS v4
- Motion for reveals and text effects, GSAP + ScrollTrigger for scroll / 3D scenes, Lenis for smooth scroll
- Custom canvas backgrounds (gravity stars, ember fireworks)
- lucide-react and react-icons

## Structure
- `src/data/portfolioData.js` — all copy, projects, skills and links
- `src/components/` — sections (Hero, Showreel, Work, About, Skills, Contact), device frames, cursor
- `src/components/effects/` — GravityStarsBackground, FireworksBackground, BlurStagger
- `src/components/texts/` — GradientText, ShimmeringText, SwappingText
- `public/videos/` — muted screen recordings of each live project (`.mp4` + `.webm` + `-poster.jpg`)

Selected work includes TradeMatrix, Meridian Trading, Fingerprint Re-Touch ID, AVENIQ and Harmony Music, plus ApexSnap on GitHub.

Videos only load when they scroll near the viewport and pause off-screen. With
`prefers-reduced-motion` the site skips smooth scroll, pinning and autoplay.

## Scripts
```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # outputs dist/ (Netlify publishes this)
```
