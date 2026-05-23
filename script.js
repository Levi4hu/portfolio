// ── SCROLL REVEAL ──────────────────────────────
// Featured projektek NINCSENEK benne — a videók miatt
const revealEls = document.querySelectorAll(
    '.section-label, section h2, .about-right, .project-item, .edu-item, .cv-right, .contact-links, footer'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => observer.observe(el));
  
  // ── MOBILE NAV ─────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('nav ul a');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // ── SCREEN SWITCHER ────────────────────────────
  let currentScreen = 1;
  let screenInterval;
  
  function switchScreen(n) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    const screen = document.getElementById('screen-' + n);
    if (screen) screen.classList.add('active');
    const dots = document.querySelectorAll('.dot');
    if (dots[n - 1]) dots[n - 1].classList.add('active');
    currentScreen = n;
  }
  
  function startScreenRotation() {
    screenInterval = setInterval(() => {
      currentScreen = currentScreen >= 4 ? 1 : currentScreen + 1;
      switchScreen(currentScreen);
    }, 2800);
  }
  
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(screenInterval);
      switchScreen(i + 1);
      startScreenRotation();
    });
  });
  startScreenRotation();
  
  // ── NAVBAR ACTIVE LINK ─────────────────────────
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('load', updateActiveNav);
  
  // ── EDUCATION ACCORDION ────────────────────────
  function toggleEdu(el) {
    const isOpen = el.classList.contains('open');
    document.querySelectorAll('.edu-item').forEach(item => {
      item.classList.remove('open');
      item.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      el.classList.add('open');
      el.setAttribute('aria-expanded', 'true');
    }
  }
  
  document.querySelectorAll('.edu-item').forEach(item => {
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleEdu(item); }
    });
  });
  
  // ── VIDEO AUTOPLAY ─────────────────────────────
  const videos = document.querySelectorAll('video');
  
  // Próbáljuk azonnal lejátszani
  videos.forEach(video => {
    video.muted = true;
    video.play().catch(() => {});
  });
  
  // Ha görgetéskor láthatóvá válik, indítjuk
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      }
    });
  }, { threshold: 0.1 });
  
  videos.forEach(video => videoObserver.observe(video));
  
  // Első user interaction után is megpróbáljuk
  document.addEventListener('click', () => {
    videos.forEach(video => {
      if (video.paused) video.play().catch(() => {});
    });
  }, { once: true });
  
  document.addEventListener('scroll', () => {
    videos.forEach(video => {
      if (video.paused) video.play().catch(() => {});
    });
  }, { once: true, passive: true });
  // ── EASTER EGG ─────────────────────────────────
document.querySelector('.hero-photo').addEventListener('click', () => {
    document.getElementById('egg-backdrop').classList.add('active');
    document.getElementById('egg-card').classList.add('active');
  });
  
  function closeEgg() {
    document.getElementById('egg-backdrop').classList.remove('active');
    document.getElementById('egg-card').classList.remove('active');
  }
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeEgg();
  });