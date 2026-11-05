/**
 * All portfolio content lives here so copy can be edited without touching layout code.
 * Everything below is taken from Arham's resume and live projects. Keep it honest.
 */

export const PERSONAL_INFO = {
  name: 'Muhammad Arham',
  firstName: 'Muhammad',
  lastName: 'Arham',
  role: 'Web Developer',
  location: 'Karachi, Pakistan',
  status: 'Open to remote work and Karachi roles',
  intro:
    "I build web apps that feel calm to use, even when the problem underneath isn't. CS graduate from NED University, working mostly in React, JavaScript and Tailwind.",
  about: [
    "I'm a Computer Science graduate from NED University of Engineering & Technology in Karachi. Most of my time goes into React: turning a messy workflow into a screen people can actually understand.",
    'My final year project took me further than the browser. We trained CNN, U-Net and CycleGAN models to clean up worn fingerprints, the kind that fail at verification counters for older people and labourers, and I built the React front end that shows the pipeline at work.',
    "I like small details: a loading state that tells you what's happening, a table that still reads well on a phone, an animation that helps instead of showing off.",
  ],
  email: 'mr.arham170@gmail.com',
  phone: '+92 310 3323518',
  phoneHref: 'tel:+923103323518',
  linkedin: 'https://www.linkedin.com/in/muhammad-arham-b00265421',
  github: 'https://github.com/Arham518',
  resumeUrl: '/resume.pdf',
};

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const JOURNEY = [
  {
    period: '2018 – 2020',
    title: 'Matric',
    place: 'Sukkur Board',
    note: 'A grade',
  },
  {
    period: '2020 – 2022',
    title: 'Intermediate',
    place: 'Mirpurkhas Board',
    note: 'A1 grade',
  },
  {
    period: '2022 – 2026',
    title: 'BS Computer Science',
    place: 'NED University of Engineering & Technology',
    note: 'CGPA 3.00 / 4.00',
  },
  {
    period: 'Mar – May 2025',
    title: 'Web Development Intern',
    place: 'VirtuoSoft Software House, Karachi',
    note: 'Turned design mockups into responsive, cross-browser pages and reusable components with the team.',
  },
  {
    period: '2026',
    title: "Chairman's Medal, Best Paper",
    place: '“Fingerprint Enhancement Using Machine Learning”',
    note: 'Final year research paper, recognised at an international conference.',
  },
];

export const SKILL_GROUPS = [
  {
    label: 'Frontend',
    items: ['React.js', 'JavaScript (ES6+)', 'React Router', 'Redux', 'Context API', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  { label: 'UI', items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Framer Motion'] },
  { label: 'Backend & Data', items: ['Node.js', 'Express.js', 'Flask', 'REST APIs (Axios)', 'SQL', 'MongoDB', 'Firebase'] },
  { label: 'ML / Imaging', items: ['Python', 'OpenCV', 'TensorFlow'] },
  { label: 'Tools', items: ['Git & GitHub', 'npm', 'Vite', 'VS Code', 'Netlify', 'Vercel', 'C++'] },
];

export const MARQUEE_SKILLS = [
  'React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express', 'Flask', 'Redux', 'Python',
  'OpenCV', 'TensorFlow', 'MongoDB', 'Firebase', 'Git', 'Vite', 'Netlify', 'Vercel',
];

/**
 * device: 'laptop' | 'browser' | 'phone' controls the frame each recording sits in.
 * video: base name of files in /public/videos (mp4 + webm + -poster.jpg)
 */
export const PROJECTS = [
  {
    id: 'tradematrix',
    index: '01',
    title: 'TradeMatrix',
    kind: 'Shopify inventory sync · frontend demo',
    problem:
      'Small Shopify sellers get stock sheets from suppliers in CSV or Excel and update every product by hand, which is slow and easy to get wrong.',
    solution:
      'A clean flow for uploading the supplier file, matching SKUs, reviewing every stock and price change, then syncing. This build is a working frontend demo with sample data.',
    tech: ['React', 'React Router', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'PapaParse'],
    live: 'https://stocksyncpro.netlify.app',
    github: 'https://github.com/Arham518/stocksync',
    video: 'stocksync',
    device: 'laptop',
    accent: '#34d399',
  },
  {
    id: 'meridian',
    index: '02',
    title: 'Meridian Trading',
    kind: 'Signals desk · live charts · paper account',
    problem:
      'Most trading signal channels post calls with no history, so you never really know which ones worked.',
    solution:
      'Every signal is logged with its entry, stop and targets and checked against live public market prices. A paper account lets you practise without real money.',
    tech: ['React', 'Three.js', 'Lightweight Charts', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL'],
    live: 'https://meridian-trading.hostless.app/',
    github: 'https://github.com/Arham518/meridian-trading-platform',
    video: 'meridian',
    device: 'laptop',
    accent: '#60a5fa',
  },
  {
    id: 'fingerprint',
    index: '03',
    title: 'Fingerprint Re-Touch ID',
    kind: "Final year project · Chairman's Medal paper",
    problem:
      'In Pakistan, many older people and labourers have worn or damaged fingerprints, so biometric checks for ID and banking keep failing them.',
    solution:
      'Deep learning models (CNN, U-Net, CycleGAN) restore ridge detail before matching. I built the React front end that talks to a Flask backend to show the enhancement.',
    tech: ['React', 'Flask', 'Axios', 'Python', 'TensorFlow', 'OpenCV'],
    live: 'https://reidehancemenet.netlify.app',
    github: 'https://github.com/Arham518/re_id_enhance',
    video: 'fingerprint',
    device: 'browser',
    accent: '#38bdf8',
  },
  {
    id: 'aveniq',
    index: '04',
    title: 'AVENIQ',
    kind: 'SaaS productivity workspace',
    problem:
      'Tasks, notes and progress tracking usually live in three different apps, and switching between them breaks focus.',
    solution:
      'One React workspace with task boards, notes and a light analytics view, built from reusable components that stay readable from desktop down to a phone.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
    live: 'https://flowdesk-saas-web.netlify.app',
    github: 'https://github.com/Arham518/flowdesk-saas',
    video: 'flowdesk',
    device: 'laptop',
    accent: '#f59e0b',
  },
  {
    id: 'harmony',
    index: '05',
    title: 'Harmony Music',
    kind: 'Browser music player',
    problem: 'Playing your own music files usually means installing an app or signing up for something.',
    solution:
      'A player that runs right in the browser: drop in MP3s, build a queue and control playback with a focused, album-first interface.',
    tech: ['React', 'JavaScript', 'Web Audio', 'Tailwind CSS'],
    live: 'https://harmonypremiummusic.netlify.app',
    github: 'https://github.com/Arham518/MusicPlayer',
    video: 'harmony',
    device: 'phone',
    accent: '#f87171',
  },
];

export const MORE_WORK = [
  {
    title: 'ApexSnap',
    note: 'An image gallery with category filters, a lightbox and scroll-driven motion — built to feel like flipping through a photo book, not a folder of thumbnails.',
    github: 'https://github.com/Arham518/CodeAlpha_ImageGallery',
  },
];

export const SERVICES = [
  { title: 'React front ends', text: 'Single-page apps with clear components, routing and state that the next developer can follow.' },
  { title: 'Design to code', text: 'Figma or a screenshot turned into a responsive page that holds up on every screen size.' },
  { title: 'Dashboards & data screens', text: 'Tables, charts and upload flows that make dense information easy to scan.' },
  { title: 'API wiring', text: 'Connecting the UI to REST APIs with sensible loading, empty and error states.' },
];
