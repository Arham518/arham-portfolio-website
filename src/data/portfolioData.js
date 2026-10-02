/**
 * Portfolio Data Model
 * Clean, structured, OOP data architecture for Muhammad Arham Bhatti's Portfolio
 */

export const PERSONAL_INFO = {
  name: "Arham Bhatti",
  fullName: "Muhammad Arham Bhatti",
  brandLogo: "Arham Bhatti",
  role: "Web Developer",
  roleGradient: "Web Developer.",
  title: "Frontend React Developer",
  status: "Available for Remote Work",
  statusBadge: "Available for Remote Work",
  bioHeadline: "I'm a passionate Web Developer based in Karachi, Pakistan.",
  bioSummary: "I recently graduated with a BS in Computer Science from NED University of Engineering & Technology. I have hands-on experience in React.js, JavaScript, HTML, CSS, and modern web technologies. I enjoy building clean, responsive and scalable web applications and I'm always eager to learn new things and work on real-world projects.",
  heroTagline: "I build modern, responsive and user-friendly web applications using React.js, JavaScript and modern technologies. I turn ideas into real, functional and scalable products.",
  location: "Karachi, Pakistan",
  email: "mr.arham170@gmail.com",
  phone: "+92 310 3323518",
  linkedin: "https://www.linkedin.com/in/arham-bhatti-b00265421/",
  linkedinHandle: "linkedin.com/in/arham-bhatti-b00265421",
  github: "https://github.com/Arham518",
  githubHandle: "github.com/Arham518",
  resumeUrl: "/resume.pdf",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const HERO_HIGHLIGHTS = [
  {
    icon: "code",
    title: "Clean Code",
    subtitle: "Readable & maintainable",
  },
  {
    icon: "zap",
    title: "Fast Delivery",
    subtitle: "On time, every time",
  },
  {
    icon: "user-check",
    title: "Client Focused",
    subtitle: "Your success matters",
  },
];

export const SKILLS_LIST = [
  { name: "React.js", category: "Frontend", color: "#06B6D4", bg: "#ECFEFF", border: "#CFFAFE", iconType: "react" },
  { name: "JavaScript", category: "Frontend", color: "#EAB308", bg: "#FEFCE8", border: "#FEF08A", iconType: "js" },
  { name: "HTML5", category: "Frontend", color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", iconType: "html" },
  { name: "CSS3", category: "Frontend", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", iconType: "css" },
  { name: "Tailwind CSS", category: "Frontend", color: "#0EA5E9", bg: "#F0F9FF", border: "#BAE6FD", iconType: "tailwind" },
  { name: "Bootstrap", category: "Frontend", color: "#7C3AED", bg: "#FAF5FF", border: "#E9D5FF", iconType: "bootstrap" },
  { name: "Redux", category: "Frontend", color: "#7E22CE", bg: "#FAF5FF", border: "#E9D5FF", iconType: "redux" },
  { name: "REST APIs", category: "Tools", color: "#4F46E5", bg: "#EEF2FF", border: "#C7D2FE", iconType: "api" },
  { name: "Git & GitHub", category: "Tools", color: "#E11D48", bg: "#FFF1F2", border: "#FECDD3", iconType: "git" },
  { name: "Node.js (Basic)", category: "Backend", color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", iconType: "node" },
  { name: "Flask (Basic)", category: "Backend", color: "#334155", bg: "#F8FAFC", border: "#E2E8F0", iconType: "flask" },
  { name: "C / C++ (Basic)", category: "Languages", color: "#0284C7", bg: "#F0F9FF", border: "#BAE6FD", iconType: "c" },
  { name: "Python (Basic)", category: "Languages", color: "#CA8A04", bg: "#FEFCE8", border: "#FEF08A", iconType: "python" },
  { name: "Responsive Design", category: "Frontend", color: "#0D9488", bg: "#F0FDFA", border: "#CCFBF1", iconType: "responsive" },
];

export const TIMELINE_CARDS = {
  education: {
    title: "BS Computer Science",
    subtitle: "NED University of Engineering & Technology",
    period: "2022 – 2026",
    grade: "CGPA: 3.00/4.00",
    description: "Rigorous Computer Science curriculum covering Data Structures, Algorithms, OOP, Database Systems, Software Engineering, and Modern Web Development.",
  },
  experience: {
    title: "Frontend Developer Intern",
    subtitle: "VirtuoSoft Software House",
    period: "Mar 2025 – May 2025 (2 Months)",
    description: "Developed responsive React.js web apps with reusable component architecture, integrated RESTful APIs, and collaborated on Git workflows.",
  },
  projects: {
    title: "4+ Real Projects",
    subtitle: "React.js | JavaScript | Tailwind CSS | Flask",
    description: "Built end-to-end web applications featuring complex state management, custom audio players, SaaS interfaces, and biometric image processors.",
  },
  opportunity: {
    title: "Open to new opportunities",
    subtitle: "Remote • Karachi (Onsite/Hybrid) • Worldwide",
  },
};

export const PROJECTS_DATA = [
  {
    id: "harmony",
    title: "Harmony Premium Music",
    category: "React App",
    tagline: "Browser-based Music Player with Drag & Drop",
    description: "A sleek, modern music player app built with React.js. Features drag-and-drop MP3 loading, playlist management, playback controls, and a premium dark aesthetic with album art focus.",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "Audio API"],
    liveUrl: "https://harmonypremiummusic.netlify.app",
    githubUrl: "https://github.com/Arham518",
    badge: "Featured",
    color: "#4f46e5",
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Drag-and-drop MP3 local file loading",
      "Dynamic queue & playlist management",
      "Live playback progress and volume scrubbing",
      "Minimalist dark UI with focus on album aesthetics",
    ],
    caseStudy: {
      problem: "Music players often force users through registration, paywalls, or cluttered advertisements just to listen to their own music files.",
      solution: "Engineered a client-side single page app using HTML5 Web Audio API and React state. Users can drop audio files directly into their browser with zero latency.",
      learnings: "Deepened mastery over HTML5 audio DOM events, state synchronization, and building fluid audio visualization interfaces.",
    }
  },
  {
    id: "flowdesk",
    title: "FlowDesk SaaS Platform",
    category: "SaaS & Landing",
    tagline: "High-Converting Modern Product Experience",
    description: "A professional SaaS product landing page with a modern dark theme, feature grids, pricing plans, testimonials, and a polished conversion-focused UI built with React.js.",
    tags: ["React.js", "SaaS", "Tailwind CSS", "UI/UX"],
    liveUrl: "https://flowdesk-saas-web.netlify.app",
    githubUrl: "https://github.com/Arham518",
    badge: "Popular",
    color: "#2563eb",
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Modern dark theme SaaS UI design system",
      "Interactive feature matrix with icon-led cards",
      "Multi-tier pricing plan toggler (monthly/yearly)",
      "High Core Web Vitals score & responsive breakpoints",
    ],
    caseStudy: {
      problem: "Communicating complex software features quickly while maintaining an engaging visual hierarchy and strong conversion rate.",
      solution: "Created an intuitive visual rhythm using progressive disclosure, high-contrast callouts, and clean Tailwind design tokens.",
      learnings: "Mastered responsive layout grids, component-level CSS optimizations, and conversion funnel UX principles.",
    }
  },
  {
    id: "gallery",
    title: "Code Alpha Image Gallery",
    category: "Interactive UI",
    tagline: "Dynamic Masonry Layout with Lightbox Modal",
    description: "An interactive image gallery application with responsive masonry layout, category filtering, lightbox modal viewer, hover animations, and smooth transitions built during CodeAlpha internship.",
    tags: ["React.js", "CSS3 Grid", "JavaScript", "Masonry"],
    liveUrl: "https://code-alpha-gallery.netlify.app",
    githubUrl: "https://github.com/Arham518",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    features: [
      "Responsive masonry layout without external bloated libraries",
      "Instant category filtering with smooth fade transitions",
      "Full-screen lightbox modal with image navigation",
      "Progressive image rendering and lazy loading",
    ],
    caseStudy: {
      problem: "Creating an Pinterest-style masonry grid without layout shifts or heavy third-party JavaScript libraries.",
      solution: "Utilized pure CSS column algorithms coupled with React state to deliver instant image category filtering and modal transitions.",
      learnings: "Strengthened algorithmic CSS layout knowledge and accessibility handling for modal dialogs.",
    }
  },
  {
    id: "retouchid",
    title: "RE Touch ID — Fingerprint Enhancement",
    category: "Image Processing",
    tagline: "Biometric & Latent Fingerprint Enhancement",
    description: "A specialized web application for fingerprint image enhancement with drag-and-drop upload, real-time processing visualization, before/after comparison, and enhancement controls.",
    tags: ["React.js", "Canvas API", "JavaScript", "Algorithms"],
    liveUrl: "https://reidehancemenet.netlify.app",
    githubUrl: "https://github.com/Arham518",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    features: [
      "Interactive canvas-based image processing engine",
      "Side-by-side and overlay before/after comparison",
      "Custom parameter tuning for ridge enhancement",
      "Instant export of enhanced biometric images",
    ],
    caseStudy: {
      problem: "Forensic fingerprint tools are predominantly heavy desktop applications unavailable on the web for rapid analysis.",
      solution: "Leveraged HTML5 Canvas pixel manipulation algorithms integrated seamlessly inside a modern React control panel.",
      learnings: "Acquired deep hands-on expertise in direct pixel data buffers, histogram equalization, and spatial filtering algorithms.",
    }
  },
];

export const SERVICES_DATA = [
  {
    icon: "code",
    title: "React.js Development",
    description: "Building scalable, single-page web applications with modular components, custom hooks, and robust state management.",
  },
  {
    icon: "palette",
    title: "Frontend Engineering",
    description: "Translating design mockups into pixel-perfect, accessible, and responsive HTML, CSS, and modern JavaScript.",
  },
  {
    icon: "smartphone",
    title: "Responsive Web Design",
    description: "Ensuring web applications look and function flawlessly across desktops, tablets, and smartphones.",
  },
  {
    icon: "rocket",
    title: "Performance Optimization",
    description: "Maximizing speed, Core Web Vitals, and SEO with lazy loading, asset compression, and clean bundle architecture.",
  },
  {
    icon: "plug",
    title: "RESTful API Integration",
    description: "Connecting frontend user interfaces seamlessly with backend REST APIs, authentication, and data services.",
  },
  {
    icon: "sparkles",
    title: "UI / UX Modernization",
    description: "Revamping legacy websites into polished, modern digital experiences that engage users and drive conversions.",
  },
];
