// =============================================
// SHITAL BHELAVE PORTFOLIO — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === AOS Init ===
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  // === Typed Text Effect ===
  const phrases = [
    'Full Stack Apps',
    'ReactJS Dashboards',
    'Node.js APIs',
    'Real-time Systems',
    'Production Systems',
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  const el = document.getElementById('typed-text');

  function type() {
    if (!el) return;
    const current = phrases[phraseIdx];
    el.textContent = isDeleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);

    let delay = isDeleting ? 50 : 80;

    if (!isDeleting && charIdx === current.length + 1) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 300;
    }
    setTimeout(type, delay);
  }
  type();

  // === Active Nav on Scroll ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // === Scroll Top Button ===
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // === Mobile Nav Toggle ===
  const navToggle = document.getElementById('navToggle');
  const header = document.getElementById('header');

  navToggle.addEventListener('click', () => {
    header.classList.toggle('open');
    navToggle.querySelector('i').className = header.classList.contains('open')
      ? 'bi bi-x'
      : 'bi bi-list';
  });

  // Close sidebar on nav link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        header.classList.remove('open');
        navToggle.querySelector('i').className = 'bi bi-list';
      }
    });
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// === Contact Form ===
function handleContactSubmit() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !subject || !message) {
    feedback.style.color = '#ef4444';
    feedback.textContent = 'Please fill in all fields.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.style.color = '#ef4444';
    feedback.textContent = 'Please enter a valid email address.';
    return;
  }

  // Mailto fallback (no backend needed for static site)
  const mailtoLink = `mailto:bhelaveshital@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;

  feedback.style.color = '#059669';
  feedback.textContent = '✓ Opening your email client...';

  // Clear form
  ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
