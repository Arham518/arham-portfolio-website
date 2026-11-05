# Muhammad Arham — Portfolio

Personal portfolio of Muhammad Arham, frontend & React developer from Karachi.

## Stack
- React 19 + Vite
- Tailwind CSS v4
- Motion (framer-motion) for reveals, GSAP + ScrollTrigger for scroll scenes, Lenis for smooth scroll
- lucide-react and react-icons

## Structure
- `src/data/portfolioData.js` — all copy, projects, skills and links
- `src/components/` — sections (Hero, Showreel, Work, About, Skills, Contact) and the device frames
- `public/videos/` — muted screen recordings of each live project (`.mp4` + `.webm` + `-poster.jpg`)

Videos only load when they scroll near the viewport and pause off-screen. With
`prefers-reduced-motion` the site skips smooth scroll, pinning and autoplay.

## Scripts
```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # outputs dist/ (Netlify publishes this)
```
