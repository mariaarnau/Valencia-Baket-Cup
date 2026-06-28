/* ================================
   CURSOR
================================ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ================================
   NAV SCROLL
================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ================================
   BURGER MENU
================================ */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ================================
   SCROLL REVEAL
================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ================================
   CONTADOR ANIMADO
================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('es-ES');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('es-ES') + '+';
  };
  requestAnimationFrame(update);
}

const contadorObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.contador__num').forEach(animateCounter);
      contadorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const contadorEl = document.querySelector('.contador__inner');
if (contadorEl) contadorObserver.observe(contadorEl);

/* ================================
   GALERÍA FILTROS
================================ */
const filters = document.querySelectorAll('.galeria__filter');
const items = document.querySelectorAll('.galeria__item');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? '' : 'none';
      if (show) {
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = 'fadeIn 0.4s ease forwards';
      }
    });
  });
});

const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}`;
document.head.appendChild(style);

/* ================================
   LIGHTBOX
================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let visibleItems = [];
let currentIndex = 0;

function openLightbox(index) {
  visibleItems = [...document.querySelectorAll('.galeria__item:not([style*="display: none"])')];
  currentIndex = index;
  showLightboxItem(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem(i) {
  const item = visibleItems[i];
  if (!item) return;
  const img = item.querySelector('img');
  const caption = item.querySelector('.galeria__item-overlay span');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

items.forEach((item, i) => {
  item.addEventListener('click', () => {
    const visible = [...document.querySelectorAll('.galeria__item:not([style*="display: none"])')];
    const idx = visible.indexOf(item);
    openLightbox(idx);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxItem(currentIndex);
});

lightboxNext.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxItem(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

/* ================================
   PARALLAX HERO
================================ */
const heroImg = document.querySelector('.hero__img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrollY = window.scrollY;
  heroImg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
}, { passive: true });

/* ================================
   TORNEO CARDS STAGGER
================================ */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.torneo-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 150);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const torneosGrid = document.querySelector('.torneos__grid');
if (torneosGrid) {
  torneosGrid.querySelectorAll('.torneo-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });
  cardObserver.observe(torneosGrid);
}

/* ================================
   FORMULARIO
================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = '✓ Mensaje enviado';
    btn.style.background = '#1a6e1a';
    btn.style.borderColor = '#1a6e1a';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3500);
  });
}

/* ================================
   PDF MODAL
================================ */
function openPDF(fileId) {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  frame.src = `https://drive.google.com/file/d/${fileId}/preview`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePDF() {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  modal.classList.remove('open');
  frame.src = '';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePDF();
});

/* ================================
   NAV ACTIVE LINK (multi-page)
================================ */
(function () {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkFile === filename) {
      a.classList.add('nav__active');
    }
  });
})();

/* ================================
   SMOOTH ANCHOR SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ================================
   SELECTOR DE IDIOMA
================================ */
const translations = {
  es: {
    'nav-torneos': 'Torneos',
    'nav-galeria': 'Galería',
    'nav-noticias': 'Noticias',
    'nav-revista': 'Revista',
    'nav-inscripcion': 'Inscripción',
    'nav-contacto': 'Contacto',
    'hero-eyebrow': 'El torneo de baloncesto más prestigioso del Mediterráneo',
    'hero-btn': 'Descubre los torneos',
    'torneos-tag': 'Próximas citas',
    'torneos-title': 'Nuestros <em>Torneos</em>',
    'patrocinadores-label': 'Con el apoyo de',
    'footer-brand-sub': 'El torneo más prestigioso del Mediterráneo',
    'footer-torneos-title': 'Torneos 2026–2027',
    'footer-nav-title': 'Navegación',
    'footer-copy': '© 2026 Valencia Basket Cup · Todos los derechos reservados',
  },
  en: {
    'nav-torneos': 'Tournaments',
    'nav-galeria': 'Gallery',
    'nav-noticias': 'News',
    'nav-revista': 'Magazine',
    'nav-inscripcion': 'Registration',
    'nav-contacto': 'Contact',
    'hero-eyebrow': 'The most prestigious basketball tournament in the Mediterranean',
    'hero-btn': 'Discover the tournaments',
    'torneos-tag': 'Upcoming dates',
    'torneos-title': 'Our <em>Tournaments</em>',
    'patrocinadores-label': 'Supported by',
    'footer-brand-sub': 'The most prestigious tournament in the Mediterranean',
    'footer-torneos-title': 'Tournaments 2026–2027',
    'footer-nav-title': 'Navigation',
    'footer-copy': '© 2026 Valencia Basket Cup · All rights reserved',
  }
};

function applyLanguage(lang) {
  const t = translations[lang];
  const navLinks = document.querySelectorAll('.nav__links a');
  const labels = ['nav-torneos','nav-galeria','nav-noticias','nav-revista','nav-inscripcion','nav-contacto'];
  navLinks.forEach((a, i) => { if (labels[i] && t[labels[i]]) a.textContent = t[labels[i]]; });

  const eyebrow = document.querySelector('.hero__eyebrow');
  if (eyebrow && t['hero-eyebrow']) eyebrow.textContent = t['hero-eyebrow'];

  const heroBtnEl = document.querySelector('.btn--hero');
  if (heroBtnEl && t['hero-btn']) heroBtnEl.textContent = t['hero-btn'];

  const sectionTag = document.querySelector('.section-header__tag');
  if (sectionTag && t['torneos-tag']) sectionTag.textContent = t['torneos-tag'];

  const sectionTitle = document.querySelector('.section-header__title');
  if (sectionTitle && t['torneos-title']) sectionTitle.innerHTML = t['torneos-title'];

  const patLabel = document.querySelector('.patrocinadores__label');
  if (patLabel && t['patrocinadores-label']) patLabel.textContent = t['patrocinadores-label'];

  const footerSub = document.querySelector('.footer__brand p');
  if (footerSub && t['footer-brand-sub']) footerSub.innerHTML = 'Valencia Basket Cup<br/>' + t['footer-brand-sub'];

  const footerLinks = document.querySelectorAll('.footer__links h5');
  if (footerLinks[0] && t['footer-nav-title']) footerLinks[0].textContent = t['footer-nav-title'];

  const footerTorneos = document.querySelector('.footer__torneos h5');
  if (footerTorneos && t['footer-torneos-title']) footerTorneos.textContent = t['footer-torneos-title'];

  const footerCopy = document.querySelector('.footer__bottom p');
  if (footerCopy && t['footer-copy']) footerCopy.textContent = t['footer-copy'];

  document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('vbc-lang', lang);
}

const langBtns = document.querySelectorAll('.lang-switcher__btn');
langBtns.forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem('vbc-lang');
if (savedLang && savedLang !== 'es') applyLanguage(savedLang);

/* ================================
   SUBSCRIBE MODAL
================================ */
(function() {
  const btn = document.getElementById('subscribeBtn');
  const modal = document.getElementById('subscribeModal');
  const backdrop = document.getElementById('subscribeBackdrop');
  const closeBtn = document.getElementById('subscribeClose');
  const form = document.getElementById('subscribeForm');
  if (!btn || !modal) return;

  btn.addEventListener('click', () => modal.classList.add('open'));
  backdrop.addEventListener('click', () => modal.classList.remove('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    form.closest('.subscribe-modal__box').innerHTML = `
      <div class="subscribe-modal__success">
        <div style="font-size:48px;margin-bottom:16px;">✓</div>
        <h4>¡Suscripción confirmada!</h4>
        <p>Te enviaremos resultados, horarios y novedades de cada torneo a <strong>${email}</strong>.</p>
      </div>`;
    setTimeout(() => modal.classList.remove('open'), 3000);
  });
})();

/* ================================
   FAQ ACORDEÓN
================================ */
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // close all in same group
    item.closest('.faq__group').querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
