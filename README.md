# Muhammad Arham — Portfolio

Personal portfolio of **Muhammad Arham**, web developer based in Karachi. A single-page React site that presents selected work, education, skills and contact details with restrained motion.

Built with **React 19, Vite, Tailwind CSS v4, Motion, GSAP + ScrollTrigger, Lenis, lucide-react and react-icons**.

> **Status:** production-ready static site. Deployed via Netlify (`netlify.toml` publishes `dist/`).
> Contact form behaviour depends on how the live host is wired; the repo itself is front-end only.

## What works now vs. simulated vs. planned

| Area | Status |
| --- | --- |
| Hero, showreel, work grid, about, skills, contact sections | ✅ Works |
| Project showreel videos (`.mp4` + `.webm` + poster, lazy / pause off-screen) | ✅ Works |
| Custom canvas backgrounds (gravity stars, ember fireworks) | ✅ Works |
| Text effects (gradient, shimmer, swapping) and reveal animations | ✅ Works |
| Smooth scroll (Lenis) + GSAP scroll scenes | ✅ Works; skipped when `prefers-reduced-motion` |
| Resume PDF download (`public/resume.pdf`) | ✅ Works |
| Backend / CMS for editing copy | 🗓 Not required — edit `src/data/portfolioData.js` |

Selected work includes TradeMatrix, Meridian Trading, Fingerprint Re-Touch ID, AVENIQ, Harmony Music, and ApexSnap.

## Setup

```bash
git clone https://github.com/Arham518/arham-portfolio-website.git
cd arham-portfolio-website
npm install
npm run dev      # Vite local server
npm run lint
npm run build    # outputs dist/ (Netlify publish directory)
npm run preview
```

Requires Node 18+.

## Project structure

```
src/
  data/portfolioData.js   all copy, projects, skills, links, journey
  components/             Hero, Showreel, Work, About, Skills, Contact, Navbar, Footer, Cursor, …
  components/effects/     GravityStarsBackground, FireworksBackground, BlurStagger
  components/texts/       GradientText, ShimmeringText, SwappingText
  hooks/                  useSmoothScroll
  assets/                 portrait and hero images
public/
  videos/                 muted screen recordings per project
  resume.pdf
  favicon.svg
netlify.toml              build → dist, SPA redirect
```

## Known limitations

- Copy and project list are hard-coded; change them in `portfolioData.js`.
- Videos add weight to the first visit; they only load near the viewport.
- No automated tests in this repo.

## Security

No secrets required. Do not commit private contact tokens or third-party API keys.

## Author

Muhammad Arham · [GitHub Arham518](https://github.com/Arham518) · Karachi, Pakistan
