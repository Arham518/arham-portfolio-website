/* =============================================
   ARHAM BHATTI — PORTFOLIO JAVASCRIPT v2
   Advanced Animations · Dark/Light Mode
   Particles · Magnetic Buttons · 3D Tilts
   ============================================= */

'use strict';

/* ==================== THEME SYSTEM ==================== */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');
const themeFab     = document.getElementById('themeFab');
const themeIcon    = document.getElementById('themeIcon');

const DARK  = 'dark';
const LIGHT = 'light';

// Load saved preference or detect system
function getInitialTheme() {
  const saved = localStorage.getItem('arham-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('arham-theme', theme);

  const isDark = theme === DARK;

  // Navbar toggle icon
  if (themeToggleIcon) {
    themeToggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
  // FAB icon
  if (themeIcon) {
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Update particle colors
  if (window._particleInstance) {
    window._particleInstance.updateTheme(isDark);
  }
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === DARK ? LIGHT : DARK;

  // Animate the toggle button
  const btn = themeToggle || themeFab;
  if (btn) {
    btn.style.transform = 'scale(0.85) rotate(180deg)';
    setTimeout(() => { btn.style.transform = ''; }, 350);
  }

  applyTheme(next);
}

// Init theme
applyTheme(getInitialTheme());

// Bind toggle buttons
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeFab)    themeFab.addEventListener('click', toggleTheme);


/* ==================== PARTICLE SYSTEM ==================== */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx     = this.canvas.getContext('2d');
    this.particles = [];
    this.isDark  = html.getAttribute('data-theme') === DARK;
    this.mouse   = { x: -9999, y: -9999 };
    this.raf     = null;
    this.paused  = false;

    this.resize();
    this.spawn();
    this.bindEvents();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn() {
    const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(x, y) {
    return {
      x:   x ?? Math.random() * this.canvas.width,
      y:   y ?? Math.random() * this.canvas.height,
      vx:  (Math.random() - 0.5) * 0.35,
      vy:  (Math.random() - 0.5) * 0.35,
      r:   Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() < 0.35 ? '#FCA311' : (this.isDark ? '#FFFFFF' : '#14213D'),
    };
  }

  updateTheme(isDark) {
    this.isDark = isDark;
    this.particles.forEach(p => {
      if (p.color !== '#FCA311') {
        p.color = isDark ? '#FFFFFF' : '#14213D';
      }
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.spawn();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      this.paused = document.hidden;
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      // Gentle mouse repulsion
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.015;
        p.vx -= dx * force;
        p.vy -= dy * force;
      }

      // Max velocity cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.6) { p.vx *= 0.6 / speed; p.vy *= 0.6 / speed; }

      // Drift & wrap
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.015;
      const pulsedAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = pulsedAlpha;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const q = this.particles[j];
        const ex = p.x - q.x, ey = p.y - q.y;
        const edist = Math.sqrt(ex * ex + ey * ey);
        if (edist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = '#FCA311';
          ctx.globalAlpha = (1 - edist / 110) * 0.06;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
  }

  animate() {
    if (!this.paused) this.draw();
    this.raf = requestAnimationFrame(() => this.animate());
  }
}

// Init particles (only on desktop for performance)
if (window.innerWidth > 540) {
  window._particleInstance = new ParticleSystem('particleCanvas');
} else {
  // Hide canvas on mobile
  const canvas = document.getElementById('particleCanvas');
  if (canvas) canvas.style.display = 'none';
}


/* ==================== NAVBAR ==================== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks  = document.querySelectorAll('.nav-link');

let lastScrollY = 0;
let ticking = false;

function handleNavScroll() {
  const y = window.scrollY;
  if (y > 60) navbar.classList.add('scrolled');
  else        navbar.classList.remove('scrolled');
  lastScrollY = y;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleNavScroll);
    ticking = true;
  }
}, { passive: true });

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.querySelectorAll('.mobile-cta a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});


/* ==================== ACTIVE NAV LINK ==================== */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id   = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));


/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ==================== REVEAL ON SCROLL ==================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Find sibling reveals for stagger
    const parent = entry.target.parentElement;
    const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [entry.target];
    const idx = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.min(idx * 85, 400));

    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ==================== SKILL BARS ==================== */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bars = entry.target.querySelectorAll('.skill-bar');
    bars.forEach((bar, i) => {
      const w = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = w + '%';
      }, i * 130 + 200);
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


/* ==================== COUNTER ANIMATION ==================== */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 4);
    el.textContent = Math.floor(eased * target) + '+';
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-number').forEach(num => {
      const val = parseInt(num.textContent.replace(/\D/g, ''), 10);
      if (!isNaN(val)) animateCounter(num, val);
    });
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);


/* ==================== BACK TO TOP ==================== */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  backToTop.style.opacity = '0';
  backToTop.style.pointerEvents = 'none';
  backToTop.style.transition = 'opacity 0.35s, transform 0.35s';

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 700;
    backToTop.style.opacity = show ? '1' : '0';
    backToTop.style.pointerEvents = show ? 'all' : 'none';
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ==================== SCROLL PROGRESS BAR ==================== */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
Object.assign(progressBar.style, {
  position: 'fixed', top: '0', left: '0', height: '3px',
  background: 'linear-gradient(90deg, #FCA311, #FDBF50)',
  zIndex: '10001', width: '0%', borderRadius: '0 2px 2px 0',
  transition: 'width 0.1s linear',
  pointerEvents: 'none',
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = Math.min((window.scrollY / total) * 100, 100) + '%';
}, { passive: true });


/* ==================== MAGNETIC BUTTONS ==================== */
function initMagnetic() {
  if (window.innerWidth <= 900) return;

  const magnetTargets = document.querySelectorAll(
    '.btn-hire-hero, .btn-hire-nav, .btn-primary, .btn-resume, .btn-secondary, .overlay-btn, .case-study-link'
  );

  magnetTargets.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const pull = 0.18;
      btn.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

initMagnetic();


/* ==================== 3D CARD TILT ==================== */
function initTilt() {
  if (window.innerWidth <= 900) return;

  const tiltTargets = document.querySelectorAll(
    '.project-card, .service-card, .timeline-card, .contact-card, .contact-form-wrap'
  );

  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX = y * -6;
      const tiltY = x *  6;
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

initTilt();


/* ==================== CURSOR GLOW ==================== */
function initCursorGlow() {
  if (window.innerWidth <= 900) return;

  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed',
    width: '350px', height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(252,163,17,0.045) 0%, transparent 70%)',
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    zIndex: '9997',
    transition: 'opacity 0.4s',
  });
  document.body.appendChild(glow);

  let mx = -1000, my = -1000, cx = -1000, cy = -1000;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function trackCursor() {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(trackCursor);
  }
  trackCursor();
}

initCursorGlow();


/* ==================== PARALLAX HERO ORBS ==================== */
const orbs = document.querySelectorAll('.hero-orb');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = i === 0 ? 0.12 : i === 1 ? 0.08 : 0.15;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });


/* ==================== HERO GRID PARALLAX ==================== */
const heroGrid = document.querySelector('.hero-grid');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.04}px)`;
  }, { passive: true });
}


/* ==================== FLOATING BADGES ENHANCED ==================== */
// Already animated via CSS; add interactive tilt on hover
document.querySelectorAll('.floating-badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform += ' scale(1.1)';
    badge.style.zIndex = '10';
    badge.style.boxShadow = '0 8px 25px rgba(252,163,17,0.25)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = '';
    badge.style.zIndex = '';
    badge.style.boxShadow = '';
  });
});


/* ==================== SKILL CARD STAGGER FLOAT ==================== */
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, i) => {
  card.style.animationDelay = `${i * 0.15}s`;
});


/* ==================== SOFT SKILL TAGS WAVE ==================== */
document.querySelectorAll('.soft-skill-tag').forEach((tag, i) => {
  tag.style.transitionDelay = `${i * 0.04}s`;
});


/* ==================== PROJECT IMAGE LAZY REVEAL ==================== */
const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity    = '1';
    entry.target.style.transform  = 'scale(1)';
    imgObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-image, .case-study-preview').forEach(img => {
  img.style.opacity    = '0.2';
  img.style.transform  = 'scale(0.97)';
  img.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  imgObserver.observe(img);
});


/* ==================== HIRE ME BUTTON RIPPLE ==================== */
function createRipple(e, btn) {
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  const rect = btn.getBoundingClientRect();

  Object.assign(circle.style, {
    position: 'absolute',
    width:  diameter + 'px',
    height: diameter + 'px',
    left:   (e.clientX - rect.left  - radius) + 'px',
    top:    (e.clientY - rect.top   - radius) + 'px',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: 'rippleAnim 0.55s ease-out forwards',
    pointerEvents: 'none',
  });

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn-hire-hero, .btn-hire-nav, .btn-primary').forEach(btn => {
  btn.addEventListener('click', e => createRipple(e, btn));
});


/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  // Floating label effect
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.classList.add('focused');
    });
    field.addEventListener('blur', () => {
      field.parentElement.classList.remove('focused');
    });
  });

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('contactName')?.value.trim();
    const email   = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !subject || !message) {
      shakeEl(document.querySelector('.contact-form-wrap'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const emailField = document.getElementById('contactEmail');
      if (emailField) {
        emailField.style.borderColor = '#ff4d4d';
        shakeEl(emailField);
        emailField.focus();
        setTimeout(() => { emailField.style.borderColor = ''; }, 2500);
      }
      return;
    }

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending...';
      const icon = submitBtn.querySelector('.btn-arrow');
      if (icon) { icon.className = 'fas fa-spinner fa-spin btn-arrow'; }
    }

    // Simulate send
    setTimeout(() => {
      if (submitBtn)   { submitBtn.style.display = 'none'; }
      if (formSuccess) { formSuccess.classList.add('show'); }
      contactForm.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.style.display = '';
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Message';
          const icon = submitBtn.querySelector('.btn-arrow');
          if (icon) { icon.className = 'fas fa-paper-plane btn-arrow'; }
        }
        if (formSuccess) formSuccess.classList.remove('show');
      }, 4500);
    }, 1600);
  });
}

function shakeEl(el) {
  if (!el) return;
  el.style.animation = 'shake 0.45s ease';
  setTimeout(() => { el.style.animation = ''; }, 460);
}


/* ==================== TIMELINE CARD ENTRANCE ==================== */
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateX(0)';
    }, i * 150);
    timelineObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-card').forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateX(30px)';
  card.style.transition= 'opacity 0.65s ease, transform 0.65s ease';
  timelineObserver.observe(card);
});


/* ==================== SERVICE CARD ENTRANCE ==================== */
const serviceObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const cards = entry.target.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
    serviceObserver.unobserve(entry.target);
  });
}, { threshold: 0.05 });

const serviceGrid = document.querySelector('.services-grid');
if (serviceGrid) {
  serviceGrid.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition= 'opacity 0.55s ease, transform 0.55s ease';
  });
  serviceObserver.observe(serviceGrid);
}


/* ==================== CASE STUDY ACCORDION (CLICK TO EXPAND) ==================== */
document.querySelectorAll('.case-study-header').forEach(header => {
  const body = header.nextElementSibling;
  if (!body || !body.classList.contains('case-study-body')) return;

  // Start all collapsed on mobile
  if (window.innerWidth <= 900) {
    body.style.maxHeight = '0';
    body.style.overflow  = 'hidden';
    body.style.transition= 'max-height 0.5s ease';
    let open = false;

    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
      open = !open;
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0';
      const num = header.querySelector('.case-study-number');
      if (num) num.style.color = open ? '#FCA311' : 'rgba(252,163,17,0.15)';
    });
  }
});


/* ==================== HIRING BANNER PULSE ==================== */
const hiringBanner = document.querySelector('.hiring-banner');
if (hiringBanner) {
  const bannerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hiringBanner.style.transform = 'translateY(0)';
        hiringBanner.style.opacity   = '1';
      }
    });
  }, { threshold: 0.2 });

  hiringBanner.style.transform = 'translateY(20px)';
  hiringBanner.style.opacity   = '0';
  hiringBanner.style.transition= 'transform 0.7s ease, opacity 0.7s ease';
  bannerObserver.observe(hiringBanner);
}


/* ==================== SECTION NUMBER COUNTERS ==================== */
const allStatObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const numbers = entry.target.querySelectorAll('.stat-number, .case-study-number');
    numbers.forEach(el => {
      if (el.classList.contains('case-study-number')) return;
      const val = parseInt(el.textContent.replace(/\D/g,''), 10);
      if (!isNaN(val)) animateCounter(el, val, 1500);
    });
    allStatObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.hero-stats').forEach(el => allStatObserver.observe(el));


/* ==================== AVATAR GLOW ON HOVER ==================== */
const avatarContainer = document.querySelector('.avatar-container');
const avatarWrapper   = document.querySelector('.avatar-wrapper');

if (avatarWrapper) {
  avatarWrapper.addEventListener('mouseenter', () => {
    const border = avatarWrapper.querySelector('.avatar-grad-border');
    if (border) border.style.animationDuration = '1.5s';
  });
  avatarWrapper.addEventListener('mouseleave', () => {
    const border = avatarWrapper.querySelector('.avatar-grad-border');
    if (border) border.style.animationDuration = '4s';
  });
}


/* ==================== PROJECT CARD 3D HOVER (ENHANCED) ==================== */
if (window.innerWidth > 900) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ==================== SKILL ICON SPIN ON HOVER ==================== */
document.querySelectorAll('.skill-card').forEach(card => {
  const icon = card.querySelector('.skill-icon i');
  if (!icon) return;
  card.addEventListener('mouseenter', () => {
    icon.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    icon.style.transform  = 'scale(1.25) rotate(-10deg)';
  });
  card.addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});


/* ==================== NAV LINK HOVER UNDERLINE ANIMATION ==================== */
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (link.classList.contains('active')) return;
    link.style.color = 'var(--text-primary)';
  });
  link.addEventListener('mouseleave', () => {
    if (!link.classList.contains('active')) {
      link.style.color = '';
    }
  });
});


/* ==================== FOOTER LINK HOVER SLIDE ==================== */
document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.paddingLeft = '6px';
  });
  link.addEventListener('mouseleave', () => {
    link.style.paddingLeft = '';
  });
});


/* ==================== TECH TAG BOUNCE ==================== */
document.querySelectorAll('.tech-tag, .project-tag, .cs-tech-stack span').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-2px) scale(1.05)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});


/* ==================== EXTERNAL LINK SAFETY ==================== */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  if (!link.rel) link.setAttribute('rel', 'noopener noreferrer');
});


/* ==================== PAGE LOAD SEQUENCE ==================== */
window.addEventListener('load', () => {
  // Fade body in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.55s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // Stagger hero content
  const heroItems = document.querySelectorAll('.hero .reveal');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 130);
  });

  // Re-init tilt and magnetic after DOM settle
  setTimeout(() => {
    initTilt();
    initMagnetic();
  }, 500);
});


/* ==================== RESIZE HANDLER ==================== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initTilt();
    initMagnetic();

    // Reset mobile accordion
    if (window.innerWidth > 900) {
      document.querySelectorAll('.case-study-body').forEach(body => {
        body.style.maxHeight = '';
        body.style.overflow  = '';
      });
    }
  }, 250);
}, { passive: true });


/* ==================== CONSOLE BRANDING ==================== */
const styles = [
  'background: linear-gradient(135deg, #14213D, #000); color: #FCA311; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 6px;',
  'color: #E5E5E5; font-size: 11px;',
  'color: #FCA311; font-size: 11px;',
];
console.log('%c👋 Muhammad Arham Bhatti — Frontend React Developer', styles[0]);
console.log('%cCS Graduate · Open to Full-Time Opportunities · Karachi, Pakistan', styles[1]);
console.log('%c📧 mr.arham170@gmail.com  |  🔗 github.com/Arham518', styles[2]);


/* ==================== PERFORMANCE: REDUCED MOTION ==================== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyReducedMotion(mq) {
  if (mq.matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('visible');
    });
    if (window._particleInstance) {
      cancelAnimationFrame(window._particleInstance.raf);
    }
    const canvas = document.getElementById('particleCanvas');
    if (canvas) canvas.style.display = 'none';
  }
}

applyReducedMotion(prefersReduced);
prefersReduced.addEventListener('change', applyReducedMotion);
