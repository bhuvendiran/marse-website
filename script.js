document.documentElement.classList.add('js');

const header = document.getElementById('site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Lightweight pointer response for the hero system visualization.
const visual = document.querySelector('.visual-frame');
if (visual && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.transform = `perspective(1000px) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
  });
  visual.addEventListener('pointerleave', () => {
    visual.style.transform = '';
  });
}
