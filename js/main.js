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
   GALERÍA FILTROS + LIGHTBOX
================================ */
(function() {
  const filters = document.querySelectorAll('.galeria__filter');
  const items = document.querySelectorAll('.galeria__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!lightbox) return;

  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}`;
  document.head.appendChild(style);

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.display = show ? '' : 'none';
        if (show) { item.style.animation = 'none'; item.offsetHeight; item.style.animation = 'fadeIn 0.4s ease forwards'; }
      });
    });
  });

  let visibleItems = [];
  let currentIndex = 0;

  function showLightboxItem(i) {
    const item = visibleItems[i];
    if (!item) return;
    const img = item.querySelector('img');
    const caption = item.querySelector('.galeria__item-overlay span');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function openLightbox(index) {
    visibleItems = [...document.querySelectorAll('.galeria__item:not([style*="display: none"])')];
    currentIndex = index;
    showLightboxItem(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const visible = [...document.querySelectorAll('.galeria__item:not([style*="display: none"])')];
      openLightbox(visible.indexOf(item));
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxItem(currentIndex); });
  lightboxNext.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxItem(currentIndex); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
})();

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
    /* NAV */
    'nav-torneos': 'Torneos',
    'nav-galeria': 'Galería',
    'nav-noticias': 'Noticias',
    'nav-revista': 'Revista',
    'nav-inscripcion': 'Inscripción',
    'nav-contacto': 'Contacto',
    /* FOOTER */
    'footer-brand-p': 'Torneo de baloncesto base a nivel internacional. Queremos que junto a tu equipo seas partícipe del Torneo de referencia en baloncesto base.',
    'footer-news-title': 'Últimas Noticias',
    'footer-news1-date': '15 Junio 2026',
    'footer-news1-title': 'VBC 2027 abre inscripciones con récord histórico de solicitudes',
    'footer-news2-date': '28 Junio 2026',
    'footer-news2-title': 'El CB Castellón se corona campeón de la Valencia Summer Cup 2026',
    'footer-links-title': 'Links',
    'footer-link-inicio': 'Inicio',
    'footer-link-galeria': 'Galería',
    'footer-link-torneos': 'Torneos',
    'footer-link-noticias': 'Noticias',
    'footer-link-revista': 'Revista',
    'footer-link-inscripcion': 'Inscripción',
    'footer-link-contacto': 'Contacto',
    'footer-contact-title': 'Contacto y Sponsors',
    'footer-copy': '© 2026 Valencia Basket Cup · Todos los derechos reservados',
    'patrocinadores-label': 'Con el apoyo de',
    /* SUBSCRIBE MODAL */
    'subscribe-title': 'Mantente al día',
    'subscribe-sub': 'Recibe resultados de cada jornada, novedades de los torneos y noticias exclusivas directamente en tu correo.',
    'subscribe-li1': 'Resultados en tiempo real',
    'subscribe-li2': 'Horarios e información de torneos',
    'subscribe-li3': 'Novedades y noticias exclusivas',
    'subscribe-li4': 'Ofertas de inscripción anticipada',
    'subscribe-email-placeholder': 'Tu correo electrónico',
    'subscribe-submit': 'Suscribirse',
    'subscribe-legal': 'Puedes darte de baja en cualquier momento. Respetamos tu privacidad.',
    /* INDEX */
    'hero-eyebrow': 'El torneo de baloncesto más prestigioso del Mediterráneo',
    'hero-btn': 'Descubre los torneos',
    'index-torneos-tag': 'Próximas citas',
    'index-torneos-title': 'Nuestros <em>Torneos</em>',
    'home-vbc-fecha': '3 — 5 Enero 2027',
    'home-vic-fecha': '25 — 28 Marzo 2027',
    'home-vsc-fecha': '25 — 27 Junio 2026',
    'home-card-cta': 'Ver torneo →',
    'alqueria-label': 'La Alqueria del Basket · Valencia',
    'contador-jugadores': 'Jugadores',
    'contador-equipos': 'Equipos',
    'contador-ediciones': 'Ediciones',
    'contador-paises': 'Países',
    /* TORNEOS */
    'torneos-hero-tag': 'Calendario',
    'torneos-hero-title': 'Nuestros <em>Torneos</em>',
    'vbc-fecha': '3 — 5 Enero 2027',
    'vbc-loc': 'Valencia · La Alqueria del Basket',
    'vbc-desc': 'El torneo estrella de la temporada de invierno. Equipos de toda España compiten en la emblemática Alqueria del Basket de Valencia.',
    'vic-fecha': '25 — 28 Marzo 2027',
    'vic-loc': 'Valencia · Instalaciones Federación',
    'vic-desc': 'La gran cita de primavera. Cuatro días de baloncesto de alta intensidad con equipos nacionales e internacionales.',
    'vsc-fecha': '25 — 27 Junio 2026',
    'vsc-loc': 'Valencia · Pabellones Municipales',
    'vsc-desc': 'El broche de oro del verano valenciano. Torneo de verano donde el talento joven luce bajo el sol del Mediterráneo.',
    'stat-equipos': 'Equipos',
    'stat-dias': 'Días',
    'stat-categorias': 'Categorías',
    'btn-inscribirse': 'Inscribirse',
    'btn-revista-vbc': '📖 Ver Revista VBC',
    'btn-revista-vic': '📖 Ver Revista VIC',
    'btn-revista-vsc': '📖 Ver Revista VSC',
    'faq-tag': 'Información',
    'faq-title': 'Preguntas <em>Frecuentes</em>',
    'faq-group-inscripcion': 'Inscripción',
    'faq-group-categorias': 'Categorías y formato',
    'faq-group-instalaciones': 'Instalaciones y acceso',
    'faq-group-alojamiento': 'Alojamiento y logística',
    'faq-q1': '¿Cómo puedo inscribir a mi equipo?<span class="faq__icon">›</span>',
    'faq-q2': '¿Cuál es el plazo límite de inscripción?<span class="faq__icon">›</span>',
    'faq-q3': '¿Puedo cancelar la inscripción y recuperar el importe?<span class="faq__icon">›</span>',
    'faq-q4': '¿Cuántos jugadores puede tener un equipo?<span class="faq__icon">›</span>',
    'faq-q5': '¿Qué categorías hay disponibles en cada torneo?<span class="faq__icon">›</span>',
    'faq-q6': '¿Qué formato de competición se usa?<span class="faq__icon">›</span>',
    'faq-q7': '¿Existe arbitraje oficial?<span class="faq__icon">›</span>',
    'faq-q8': '¿Dónde se celebran los torneos?<span class="faq__icon">›</span>',
    'faq-q9': '¿Pueden asistir familiares y público en general?<span class="faq__icon">›</span>',
    'faq-q10': '¿Hay aparcamiento disponible?<span class="faq__icon">›</span>',
    'faq-q11': '¿La organización gestiona el alojamiento?<span class="faq__icon">›</span>',
    'faq-q12': '¿Qué incluye el precio de inscripción?<span class="faq__icon">›</span>',
    'faq-q13': '¿Hay actividades complementarias para los equipos?<span class="faq__icon">›</span>',
    'faq-q14': '¿Puedo contactar con la organización directamente?<span class="faq__icon">›</span>',
    'faq-a1': 'El proceso de inscripción se realiza a través de la sección <a href="pagos.html">Inscripción</a> de esta web. Debes completar el formulario con los datos del equipo, seleccionar el torneo y la categoría, y realizar el pago mediante transferencia bancaria o tarjeta. Recibirás una confirmación por email en un plazo de 48 horas.',
    'faq-a2': 'Las inscripciones cierran aproximadamente 3 semanas antes del inicio de cada torneo, o antes si se completan las plazas disponibles. Te recomendamos inscribirte con antelación ya que los torneos suelen completarse con rapidez.',
    'faq-a3': 'Las cancelaciones realizadas con más de 30 días de antelación tienen derecho a devolución del 80% del importe. Entre 15 y 30 días antes, el 50%. Con menos de 15 días no hay devolución, aunque el importe puede aplicarse a otra edición.',
    'faq-a4': 'Cada equipo puede inscribir entre 8 y 14 jugadores en plantilla. Adicionalmente se permiten hasta 3 miembros del cuerpo técnico (entrenador, ayudante y delegado) por equipo.',
    'faq-a5': '<strong>VBC (Enero):</strong> Sub-12, Sub-14, Sub-16 y Sub-18 masculino y femenino.<br/><strong>VIC (Marzo):</strong> Sub-10, Sub-12, Sub-14, Sub-16 y Sub-18 masculino y femenino.<br/><strong>VSC (Junio):</strong> Sub-8, Sub-10, Sub-12, Sub-14 y Sub-16 mixto y femenino.',
    'faq-a6': 'Los torneos utilizan un sistema de fase de grupos seguido de eliminatorias directas. Dependiendo del número de equipos inscritos por categoría, cada equipo disputa entre 3 y 5 partidos garantizados durante el torneo.',
    'faq-a7': 'Sí. Todos los partidos cuentan con árbitros federados designados por la Federación de Baloncesto de la Comunitat Valenciana. El nivel de arbitraje está adaptado a cada categoría.',
    'faq-a8': 'El VBC y el VIC se celebran principalmente en <strong>La Alqueria del Basket</strong>, sede oficial del Valencia Basket Club, ubicada en la Calle Camino de Moncada s/n, Valencia. El VSC utiliza además pabellones municipales del área metropolitana.',
    'faq-a9': 'Sí, la entrada es libre y gratuita para familiares y aficionados. La Alqueria del Basket tiene capacidad para más de 2.000 espectadores simultáneos y dispone de zonas de descanso, cafetería y aparcamiento.',
    'faq-a10': 'La Alqueria del Basket dispone de amplio aparcamiento gratuito para equipos y familias. Para los pabellones municipales del VSC, se indicará la disponibilidad de parking en la guía de torneo que se envía a los equipos inscritos.',
    'faq-a11': 'Disponemos de acuerdos con hoteles y residencias deportivas de Valencia a tarifas especiales para equipos participantes. Al inscribirse recibirás una guía con las opciones disponibles y sus precios. El alojamiento no está incluido en el precio de inscripción.',
    'faq-a12': 'El precio incluye: participación completa en el torneo, arbitraje oficial, acceso a todas las instalaciones, trofeos para los tres primeros clasificados de cada categoría, medallas para todos los jugadores participantes, seguro deportivo y la revista oficial del torneo en formato digital.',
    'faq-a13': 'Sí. Los equipos participantes tienen acceso a visitas guiadas a La Alqueria del Basket, la posibilidad de asistir a entrenamientos del Valencia Basket (según disponibilidad) y descuentos en establecimientos de Valencia a través de la tarjeta de participante VBC.',
    'faq-a14': 'Sí. Puedes escribirnos a través del <a href="contacto.html">formulario de contacto</a> o enviarnos un mensaje directo por Instagram. El equipo organizador responde en un plazo máximo de 24 horas en días laborables.',
    /* NOTICIAS */
    'noticias-hero-tag': 'Actualidad',
    'noticias-hero-title': 'Últimas <em>Noticias</em>',
    'noticia1-fecha': '15 Junio 2026',
    'noticia1-titulo': 'La Valencia Basket Cup 2027 abre inscripciones con récord histórico de solicitudes en las primeras 48 horas',
    'noticia1-extracto1': 'El torneo de baloncesto más prestigioso del Mediterráneo ha batido todos sus registros previos en el primer fin de semana de inscripción. Más de 120 equipos de 15 países diferentes han formalizado ya su participación en la edición que se celebrará del 3 al 5 de enero en La Alqueria del Basket.',
    'noticia1-extracto2': 'La dirección del torneo atribuye este éxito sin precedentes a la consolidación de la marca VBC a nivel europeo y a la mejora constante de las instalaciones en La Alqueria, sede oficial del Valencia Basket en ACB. Este año se incorporan nuevas categorías sub-10 y sub-12 femenino que han generado gran expectación entre los clubes participantes.',
    'noticia-leer-completo': 'Leer artículo completo →',
    'noticia2-fecha': '10 Junio 2026',
    'noticia2-titulo': 'La Valencia International Cup 2027 confirma la participación de equipos de Francia, Italia y Portugal',
    'noticia2-extracto': 'La cita internacional de primavera refuerza su dimensión europea con la incorporación de doce clubes del continente. El torneo, que se disputará del 25 al 28 de marzo de 2027, espera superar los 48 equipos participantes por primera vez en su historia.',
    'noticia-leer-mas': 'Leer más →',
    'noticia3-fecha': '28 Junio 2026',
    'noticia3-titulo': 'El CB Castellón se corona campeón de la Valencia Summer Cup 2026 en una final épica',
    'noticia3-extracto': 'El conjunto castellonense venció al Joventut B por 68-64 en una final disputada hasta el último segundo en el Pabellón Municipal de Patraix. La VSC 2026 ha congregado a más de 800 jugadores de todo el arco mediterráneo.',
    'noticia4-fecha': '5 Junio 2026',
    'noticia4-titulo': 'Valencia Basket Club firma un acuerdo de colaboración con el VBC para la detección de talento',
    'noticia4-extracto': 'El equipo de la ACB se convierte en socio estratégico del torneo y enviará a sus ojeadores a observar a los mejores jugadores sub-16 y sub-18. Un paso histórico que refuerza la proyección del VBC como cantera de referencia en España.',
    'noticia5-fecha': '20 Mayo 2026',
    'noticia5-titulo': 'Turisme Comunitat Valenciana renueva su patrocinio con el VIC por tres temporadas',
    'noticia5-extracto': 'La institución autonómica apostará por el torneo como escaparate del destino Valencia ante el turismo deportivo internacional. El acuerdo incluye actividades de difusión en mercados de Europa del Norte y del Este.',
    'noticia6-fecha': '2 Mayo 2026',
    'noticia6-titulo': 'El VBC lanza su programa de becas para equipos de clubes sin recursos del área rural valenciana',
    'noticia6-extracto': 'Hasta seis equipos podrán participar gratuitamente gracias al fondo solidario creado por los organizadores. El programa busca democratizar el acceso a la alta competición infantil y juvenil más allá de los grandes núcleos urbanos.',
    /* REVISTA */
    'revista-hero-tag': 'Ediciones oficiales',
    'revista-hero-title': 'Valencia Basket Cup<br/><em>Magazine</em>',
    'revista-hero-sub': 'Reportajes exclusivos · Estadísticas · Fotografía profesional',
    'revista-strip': 'Revive cada torneo  ·  Entrevistas exclusivas  ·  Los mejores momentos  ·  Fotografía de alta calidad  ·  Reportajes exclusivos  ·  Estadísticas y resultados  · ',
    'revista-coleccion-tag': 'Colección',
    'revista-coleccion-title': 'Nuestras <em>Ediciones</em>',
    'revista-vbc-year': 'Enero 2027',
    'revista-vbc-desc': '3 — 5 Enero 2027 · La Alqueria del Basket',
    'revista-leer': 'Leer revista',
    'revista-vic-badge': 'Edición especial',
    'revista-vic-year': 'Marzo 2027',
    'revista-vic-desc': '25 — 28 Marzo 2027 · La Alqueria del Basket',
    'revista-vsc-year': 'Junio 2026',
    'revista-vsc-desc': '25 — 27 Junio 2026 · La Alqueria del Basket',
    /* GALERIA */
    'galeria-hero-tag': 'Momentos',
    'galeria-hero-title': 'Galería <em>de Imágenes</em>',
    'galeria-filter-all': 'Todas',
    /* PAGOS */
    'pagos-hero-tag': 'Inscripción',
    'pagos-hero-title': 'Proceso de <em>Pago</em>',
    'pagos-step1-title': 'Elige tu torneo',
    'pagos-step1-desc': 'Selecciona el torneo y la categoría en la que quieres participar.',
    'pagos-step2-title': 'Completa el formulario',
    'pagos-step2-desc': 'Rellena los datos de tu equipo y jugadores inscritos.',
    'pagos-step3-title': 'Realiza el pago',
    'pagos-step3-desc': 'Pago seguro mediante tarjeta de crédito o transferencia bancaria.',
    'pagos-step4-title': 'Confirmación',
    'pagos-step4-desc': 'Recibirás la confirmación por email con todos los detalles.',
    'pagos-vbc-fecha': '3–5 Enero 2027',
    'pagos-vic-fecha': '25–28 Marzo 2027',
    'pagos-vsc-fecha': '25–27 Junio 2026',
    'pagos-period': '/ equipo',
    'pagos-feat1': '✓ Inscripción completa',
    'pagos-feat2': '✓ Arbitraje incluido',
    'pagos-feat3': '✓ Camiseta oficial del torneo',
    'pagos-feat4': '✓ Acceso a la revista digital',
    'pagos-feat5': '✓ Trofeos y medallas',
    'pagos-feat4b': '✓ Acceso a la revista impresa',
    'pagos-feat6': '✓ Foto oficial del equipo',
    'pagos-feat3b': '✓ Pack equipación oficial',
    'pagos-popular': 'Más Popular',
    'pagos-btn-vbc': 'Inscribirse al VBC',
    'pagos-btn-vic': 'Inscribirse al VIC',
    'pagos-btn-vsc': 'Inscribirse al VSC',
    'pagos-metodos-label': 'Métodos de pago aceptados',
    'pagos-metodo-tarjeta': '💳 Tarjeta',
    'pagos-metodo-transferencia': '🏦 Transferencia',
    'pagos-metodo-bizum': '📱 Bizum',
    'pagos-metodo-paypal': '🌐 PayPal',
    /* CONTACTO */
    'contacto-hero-tag': 'Contacto',
    'contacto-hero-title': '¿Tienes <em>preguntas?</em>',
    'contacto-label-nombre': 'Nombre del club / equipo',
    'contacto-placeholder-nombre': 'Club Baloncesto Valencia',
    'contacto-label-email': 'Email',
    'contacto-label-torneo': 'Torneo de interés',
    'contacto-select-default': 'Selecciona un torneo...',
    'contacto-label-mensaje': 'Mensaje',
    'contacto-placeholder-mensaje': 'Escribe tu consulta aquí...',
    'contacto-btn-enviar': 'Enviar mensaje',
    'contacto-info-ubicacion': 'Ubicación',
    'contacto-info-email-label': 'Email',
    'contacto-info-redes': 'Redes Sociales',
    /* ARTICULOS */
    'articulo-back': '← Volver a Noticias',
    'noticia1-hero-fecha': '15 Junio 2026',
    'noticia1-hero-h1': 'La Valencia Basket Cup 2027 abre inscripciones con récord histórico de solicitudes en las primeras 48 horas',
    'noticia1-lead': 'El torneo de baloncesto más prestigioso del Mediterráneo ha batido todos sus registros previos en el primer fin de semana de inscripción. Más de 120 equipos de 15 países han formalizado ya su participación para la edición del 3 al 5 de enero en La Alqueria del Basket.',
    'noticia1-p1': 'La dirección del torneo atribuye este éxito sin precedentes a la consolidación de la marca VBC a nivel europeo y a la mejora constante de las instalaciones en La Alqueria, sede oficial del Valencia Basket en ACB. Este año se incorporan nuevas categorías sub-10 y sub-12 femenino que han generado gran expectación entre los clubes participantes.',
    'noticia1-p2': '«Estamos ante la edición más ambiciosa de nuestra historia», declaró el director del torneo. «La respuesta de los clubes europeos confirma que Valencia se ha convertido en un referente del baloncesto de formación a nivel continental.»',
    'noticia1-h2-1': 'Nuevas categorías y formato ampliado',
    'noticia1-p3': 'La VBC 2027 contará por primera vez con categorías femeninas sub-10 y sub-12, una demanda histórica de los clubes participantes. El formato se amplía también con una nueva división élite para los equipos sub-16 y sub-18 con mayor rendimiento en ediciones anteriores.',
    'noticia1-p4': 'El torneo se disputará íntegramente en las instalaciones de La Alqueria del Basket, que cuenta con seis pistas de competición homologadas y capacidad para más de 2.000 espectadores simultáneos.',
    'noticia1-h2-2': 'Participación internacional',
    'noticia1-p5': 'Entre los 120 equipos ya inscritos destacan clubes de Francia, Italia, Portugal, Alemania, Reino Unido, Países Bajos, Bélgica, Polonia y Suecia, consolidando el carácter verdaderamente internacional del torneo. España aporta el mayor número de equipos, con representación de doce comunidades autónomas.',
    'noticia1-p6': 'Las inscripciones permanecerán abiertas hasta el 15 de octubre de 2026 o hasta completar el aforo máximo de 160 equipos.',
    'articulo-btn-inscribir': 'Inscribirse ahora',
    'articulo-btn-noticias': 'Más noticias',
    'sidebar-torneos-title': 'Próximos torneos',
    'sidebar-inscripcion-title': 'Inscripción',
    'sidebar-inscripcion-p': 'Plazas limitadas. Formaliza ya la participación de tu equipo.',
    'sidebar-ver-precios': 'Ver precios →',
    'sidebar-li-vbc': '<strong>Valencia Basket Cup</strong>3 — 5 Enero 2027',
    'sidebar-li-vic': '<strong>Valencia International Cup</strong>25 — 28 Marzo 2027',
    'sidebar-li-vsc': '<strong>Valencia Summer Cup</strong>25 — 27 Junio 2026',
    'noticia2-hero-fecha': '10 Junio 2026',
    'noticia2-hero-h1': 'La Valencia International Cup 2027 confirma la participación de equipos de Francia, Italia y Portugal',
    'noticia2-lead': 'La cita internacional de primavera refuerza su dimensión europea con la incorporación de doce clubes del continente. El torneo, que se disputará del 25 al 28 de marzo de 2027, espera superar los 48 equipos participantes por primera vez en su historia.',
    'noticia2-p1': 'La Valencia International Cup se ha consolidado como el torneo de referencia para los clubes europeos que buscan competir en un entorno profesional en España. La organización ha reforzado este año los contactos con federaciones de Francia, Italia y Portugal para asegurar la máxima representación continental.',
    'noticia2-p2': 'La organización trabaja para ofrecer la mejor experiencia posible a todos los participantes: arbitraje profesional, instalaciones de primer nivel en La Alqueria del Basket, alojamiento coordinado y actividades complementarias en la ciudad de Valencia.',
    'noticia2-h2-1': 'Detalles e inscripción',
    'noticia2-p3': 'Los equipos interesados pueden formalizar su inscripción a través de la sección de Inscripción de esta web. El número de plazas es limitado y se asignan por estricto orden de inscripción. El torneo incluye arbitraje oficial, trofeos para todos los participantes y acceso a las instalaciones de La Alqueria.',
    'noticia2-p4': 'Para cualquier consulta adicional, el equipo organizador está disponible a través del formulario de contacto o en el correo oficial del torneo.',
    'noticia3-hero-fecha': '28 Junio 2026',
    'noticia3-hero-h1': 'El CB Castellón se corona campeón de la Valencia Summer Cup 2026 en una final épica',
    'noticia3-lead': 'El conjunto castellonense venció al Joventut B por 68-64 en una final disputada hasta el último segundo en el Pabellón Municipal de Patraix. La VSC 2026 ha congregado a más de 800 jugadores de todo el arco mediterráneo.',
    'noticia3-p1': 'El partido, disputado ante un pabellón lleno, fue un espectáculo de principio a fin. El CB Castellón remontó un déficit de ocho puntos en el último cuarto para hacerse con el título en un emocionante final.',
    'noticia3-p2': 'La organización trabaja para ofrecer la mejor experiencia posible a todos los participantes: arbitraje profesional, instalaciones de primer nivel en La Alqueria del Basket, alojamiento coordinado y actividades complementarias en la ciudad de Valencia.',
    'noticia3-h2-1': 'Detalles e inscripción',
    'noticia3-p3': 'Los equipos interesados pueden formalizar su inscripción a través de la sección de Inscripción de esta web. El número de plazas es limitado y se asignan por estricto orden de inscripción. El torneo incluye arbitraje oficial, trofeos para todos los participantes y acceso a las instalaciones de La Alqueria.',
    'noticia3-p4': 'Para cualquier consulta adicional, el equipo organizador está disponible a través del formulario de contacto o en el correo oficial del torneo.',
    'noticia4-hero-fecha': '5 Junio 2026',
    'noticia4-hero-h1': 'Valencia Basket Club firma un acuerdo de colaboración con el VBC para la detección de talento',
    'noticia4-lead': 'El equipo de la ACB se convierte en socio estratégico del torneo y enviará a sus ojeadores a observar a los mejores jugadores sub-16 y sub-18. Un paso histórico que refuerza la proyección del VBC como cantera de referencia en España.',
    'noticia4-p1': 'El acuerdo, firmado en La Alqueria del Basket, establece que los técnicos del Valencia Basket evaluarán a los jugadores más destacados del torneo, con la posibilidad de ofrecer pruebas en su cantera a los talentos más prometedores.',
    'noticia4-p2': 'La organización trabaja para ofrecer la mejor experiencia posible a todos los participantes: arbitraje profesional, instalaciones de primer nivel en La Alqueria del Basket, alojamiento coordinado y actividades complementarias en la ciudad de Valencia.',
    'noticia4-h2-1': 'Detalles e inscripción',
    'noticia4-p3': 'Los equipos interesados pueden formalizar su inscripción a través de la sección de Inscripción de esta web. El número de plazas es limitado y se asignan por estricto orden de inscripción. El torneo incluye arbitraje oficial, trofeos para todos los participantes y acceso a las instalaciones de La Alqueria.',
    'noticia4-p4': 'Para cualquier consulta adicional, el equipo organizador está disponible a través del formulario de contacto o en el correo oficial del torneo.',
    'noticia5-hero-fecha': '20 Mayo 2026',
    'noticia5-hero-h1': 'Turisme Comunitat Valenciana renueva su patrocinio con el VIC por tres temporadas',
    'noticia5-lead': 'La institución autonómica apostará por el torneo como escaparate del destino Valencia ante el turismo deportivo internacional. El acuerdo incluye actividades de difusión en mercados de Europa del Norte y del Este.',
    'noticia5-p1': 'El torneo Valencia International Cup se ha convertido en un embajador del turismo deportivo de la Comunitat Valenciana, atrayendo cada año a cientos de familias de toda Europa que combinan la competición con una visita a la ciudad.',
    'noticia5-p2': 'La organización trabaja para ofrecer la mejor experiencia posible a todos los participantes: arbitraje profesional, instalaciones de primer nivel en La Alqueria del Basket, alojamiento coordinado y actividades complementarias en la ciudad de Valencia.',
    'noticia5-h2-1': 'Detalles e inscripción',
    'noticia5-p3': 'Los equipos interesados pueden formalizar su inscripción a través de la sección de Inscripción de esta web. El número de plazas es limitado y se asignan por estricto orden de inscripción. El torneo incluye arbitraje oficial, trofeos para todos los participantes y acceso a las instalaciones de La Alqueria.',
    'noticia5-p4': 'Para cualquier consulta adicional, el equipo organizador está disponible a través del formulario de contacto o en el correo oficial del torneo.',
    'noticia6-hero-fecha': '2 Mayo 2026',
    'noticia6-hero-h1': 'El VBC lanza su programa de becas para equipos de clubes sin recursos del área rural valenciana',
    'noticia6-lead': 'Hasta seis equipos podrán participar gratuitamente gracias al fondo solidario creado por los organizadores. El programa busca democratizar el acceso a la alta competición infantil y juvenil más allá de los grandes núcleos urbanos.',
    'noticia6-p1': 'El programa de becas del VBC nace con la vocación de hacer accesible el deporte de alto nivel a todos los jóvenes de la Comunitat Valenciana, independientemente de su lugar de origen o situación económica.',
    'noticia6-p2': 'La organización trabaja para ofrecer la mejor experiencia posible a todos los participantes: arbitraje profesional, instalaciones de primer nivel en La Alqueria del Basket, alojamiento coordinado y actividades complementarias en la ciudad de Valencia.',
    'noticia6-h2-1': 'Detalles e inscripción',
    'noticia6-p3': 'Los equipos interesados pueden formalizar su inscripción a través de la sección de Inscripción de esta web. El número de plazas es limitado y se asignan por estricto orden de inscripción. El torneo incluye arbitraje oficial, trofeos para todos los participantes y acceso a las instalaciones de La Alqueria.',
    'noticia6-p4': 'Para cualquier consulta adicional, el equipo organizador está disponible a través del formulario de contacto o en el correo oficial del torneo.',
    /* ALIASES — keys used in HTML */
    'footer-brand-desc': 'Torneo de baloncesto base a nivel internacional. Queremos que junto a tu equipo seas partícipe del Torneo de referencia en baloncesto base.',
    'footer-visit-shop': 'Visit Valencia Shop',
    'subscribe-btn': 'Suscribirse',
    'subscribe-placeholder': 'Tu correo electrónico',
    'articulo-btn-inscribirse': 'Inscribirse ahora',
    'articulo-sidebar-torneos-title': 'Próximos torneos',
    'articulo-sidebar-vbc-fecha': '3 — 5 Enero 2027',
    'articulo-sidebar-vic-fecha': '25 — 28 Marzo 2027',
    'articulo-sidebar-vsc-fecha': '25 — 27 Junio 2026',
    'articulo-sidebar-inscripcion-title': 'Inscripción',
    'articulo-sidebar-inscripcion-desc': 'Plazas limitadas. Formaliza ya la participación de tu equipo.',
    'articulo-sidebar-btn': 'Ver precios →',
    'contacto-ubicacion-label': 'Ubicación',
    'contacto-ubicacion-text': 'La Alqueria del Basket<br/>Av. dels Tarongers, s/n<br/>46022 Valencia',
    'contacto-email-label': 'Email',
    'contacto-redes-label': 'Redes Sociales',
    'pagos-per-equipo': '/ equipo',
    /* NOTICIA ARTICLE KEYS */
    'n1-date': '15 Junio 2026',
    'n1-title': 'La Valencia Basket Cup 2027 abre inscripciones con récord histórico de solicitudes en las primeras 48 horas',
    'n1-lead': 'El torneo de baloncesto más prestigioso del Mediterráneo ha batido todos sus registros previos en el primer fin de semana de inscripción. Más de 120 equipos de 15 países han formalizado ya su participación para la edición del 3 al 5 de enero en La Alqueria del Basket.',
    'n2-date': '10 Junio 2026',
    'n2-title': 'La Valencia International Cup 2027 confirma la participación de equipos de Francia, Italia y Portugal',
    'n2-lead': 'La cita internacional de primavera refuerza su dimensión europea con la incorporación de doce clubes del continente. El torneo, que se disputará del 25 al 28 de marzo de 2027, espera superar los 48 equipos participantes por primera vez en su historia.',
    'n3-date': '28 Junio 2026',
    'n3-title': 'El CB Castellón se corona campeón de la Valencia Summer Cup 2026 en una final épica',
    'n3-lead': 'El conjunto castellonense venció al Joventut B por 68-64 en una final disputada hasta el último segundo en el Pabellón Municipal de Patraix. La VSC 2026 ha congregado a más de 800 jugadores de todo el arco mediterráneo.',
    'n4-date': '5 Junio 2026',
    'n4-title': 'Valencia Basket Club firma un acuerdo de colaboración con el VBC para la detección de talento',
    'n4-lead': 'El equipo de la ACB se convierte en socio estratégico del torneo y enviará a sus ojeadores a observar a los mejores jugadores sub-16 y sub-18. Un paso histórico que refuerza la proyección del VBC como cantera de referencia en España.',
    'n5-date': '20 Mayo 2026',
    'n5-title': 'Turisme Comunitat Valenciana renueva su patrocinio con el VIC por tres temporadas',
    'n5-lead': 'La institución autonómica apostará por el torneo como escaparate del destino Valencia ante el turismo deportivo internacional. El acuerdo incluye actividades de difusión en mercados de Europa del Norte y del Este.',
    'n6-date': '2 Mayo 2026',
    'n6-title': 'El VBC lanza su programa de becas para equipos de clubes sin recursos del área rural valenciana',
    'n6-lead': 'Hasta seis equipos podrán participar gratuitamente gracias al fondo solidario creado por los organizadores. El programa busca democratizar el acceso a la alta competición infantil y juvenil más allá de los grandes núcleos urbanos.',
  },
  en: {
    /* NAV */
    'nav-torneos': 'Tournaments',
    'nav-galeria': 'Gallery',
    'nav-noticias': 'News',
    'nav-revista': 'Magazine',
    'nav-inscripcion': 'Registration',
    'nav-contacto': 'Contact',
    /* FOOTER */
    'footer-brand-p': 'International youth basketball tournament. We want your team to be part of the reference tournament in youth basketball.',
    'footer-news-title': 'Latest News',
    'footer-news1-date': 'June 15, 2026',
    'footer-news1-title': 'VBC 2027 opens registration with a historic record of applications',
    'footer-news2-date': 'June 28, 2026',
    'footer-news2-title': 'CB Castellón crowned champion of the Valencia Summer Cup 2026',
    'footer-links-title': 'Links',
    'footer-link-inicio': 'Home',
    'footer-link-galeria': 'Gallery',
    'footer-link-torneos': 'Tournaments',
    'footer-link-noticias': 'News',
    'footer-link-revista': 'Magazine',
    'footer-link-inscripcion': 'Registration',
    'footer-link-contacto': 'Contact',
    'footer-contact-title': 'Contact & Sponsors',
    'footer-copy': '© 2026 Valencia Basket Cup · All rights reserved',
    'patrocinadores-label': 'Supported by',
    /* SUBSCRIBE MODAL */
    'subscribe-title': 'Stay up to date',
    'subscribe-sub': 'Receive match results, tournament news and exclusive updates directly in your inbox.',
    'subscribe-li1': 'Real-time results',
    'subscribe-li2': 'Tournament schedules and information',
    'subscribe-li3': 'Exclusive news and updates',
    'subscribe-li4': 'Early registration offers',
    'subscribe-email-placeholder': 'Your email address',
    'subscribe-submit': 'Subscribe',
    'subscribe-legal': 'You can unsubscribe at any time. We respect your privacy.',
    /* INDEX */
    'hero-eyebrow': 'The most prestigious basketball tournament in the Mediterranean',
    'hero-btn': 'Discover the tournaments',
    'index-torneos-tag': 'Upcoming dates',
    'index-torneos-title': 'Our <em>Tournaments</em>',
    'home-vbc-fecha': 'January 3 — 5, 2027',
    'home-vic-fecha': 'March 25 — 28, 2027',
    'home-vsc-fecha': 'June 25 — 27, 2026',
    'home-card-cta': 'View tournament →',
    'alqueria-label': 'La Alqueria del Basket · Valencia',
    'contador-jugadores': 'Players',
    'contador-equipos': 'Teams',
    'contador-ediciones': 'Editions',
    'contador-paises': 'Countries',
    /* TORNEOS */
    'torneos-hero-tag': 'Schedule',
    'torneos-hero-title': 'Our <em>Tournaments</em>',
    'vbc-fecha': 'January 3 — 5, 2027',
    'vbc-loc': 'Valencia · La Alqueria del Basket',
    'vbc-desc': 'The flagship winter season tournament. Teams from across Spain compete at the iconic La Alqueria del Basket in Valencia.',
    'vic-fecha': 'March 25 — 28, 2027',
    'vic-loc': 'Valencia · Federation Facilities',
    'vic-desc': 'The major spring event. Four days of high-intensity basketball featuring national and international teams.',
    'vsc-fecha': 'June 25 — 27, 2026',
    'vsc-loc': 'Valencia · Municipal Pavilions',
    'vsc-desc': 'The golden finale of the Valencian summer. A summer tournament where young talent shines under the Mediterranean sun.',
    'stat-equipos': 'Teams',
    'stat-dias': 'Days',
    'stat-categorias': 'Categories',
    'btn-inscribirse': 'Register',
    'btn-revista-vbc': '📖 View VBC Magazine',
    'btn-revista-vic': '📖 View VIC Magazine',
    'btn-revista-vsc': '📖 View VSC Magazine',
    'faq-tag': 'Information',
    'faq-title': 'Frequently Asked <em>Questions</em>',
    'faq-group-inscripcion': 'Registration',
    'faq-group-categorias': 'Categories & format',
    'faq-group-instalaciones': 'Facilities & access',
    'faq-group-alojamiento': 'Accommodation & logistics',
    'faq-q1': 'How can I register my team?<span class="faq__icon">›</span>',
    'faq-q2': 'What is the registration deadline?<span class="faq__icon">›</span>',
    'faq-q3': 'Can I cancel my registration and get a refund?<span class="faq__icon">›</span>',
    'faq-q4': 'How many players can a team have?<span class="faq__icon">›</span>',
    'faq-q5': 'What categories are available in each tournament?<span class="faq__icon">›</span>',
    'faq-q6': 'What competition format is used?<span class="faq__icon">›</span>',
    'faq-q7': 'Is there official refereeing?<span class="faq__icon">›</span>',
    'faq-q8': 'Where are the tournaments held?<span class="faq__icon">›</span>',
    'faq-q9': 'Can families and the general public attend?<span class="faq__icon">›</span>',
    'faq-q10': 'Is parking available?<span class="faq__icon">›</span>',
    'faq-q11': 'Does the organization handle accommodation?<span class="faq__icon">›</span>',
    'faq-q12': 'What does the registration fee include?<span class="faq__icon">›</span>',
    'faq-q13': 'Are there complementary activities for teams?<span class="faq__icon">›</span>',
    'faq-q14': 'Can I contact the organization directly?<span class="faq__icon">›</span>',
    'faq-a1': 'The registration process is completed through the <a href="pagos.html">Registration</a> section of this website. You must fill in the form with your team\'s details, select the tournament and category, and make payment by bank transfer or card. You will receive a confirmation email within 48 hours.',
    'faq-a2': 'Registrations close approximately 3 weeks before the start of each tournament, or earlier if available spots are filled. We recommend registering early as tournaments tend to fill up quickly.',
    'faq-a3': 'Cancellations made more than 30 days in advance are entitled to an 80% refund. Between 15 and 30 days before, 50%. With less than 15 days\' notice there is no refund, although the amount can be applied to another edition.',
    'faq-a4': 'Each team can register between 8 and 14 players on their roster. Additionally, up to 3 coaching staff members (head coach, assistant and team delegate) are permitted per team.',
    'faq-a5': '<strong>VBC (January):</strong> U12, U14, U16 and U18 male and female.<br/><strong>VIC (March):</strong> U10, U12, U14, U16 and U18 male and female.<br/><strong>VSC (June):</strong> U8, U10, U12, U14 and U16 mixed and female.',
    'faq-a6': 'The tournaments use a group stage system followed by direct knockouts. Depending on the number of teams per category, each team is guaranteed between 3 and 5 matches during the tournament.',
    'faq-a7': 'Yes. All matches are officiated by federated referees appointed by the Basketball Federation of the Valencian Community. The level of officiating is adapted to each category.',
    'faq-a8': 'The VBC and VIC are held primarily at <strong>La Alqueria del Basket</strong>, the official home of Valencia Basket Club, located on Calle Camino de Moncada s/n, Valencia. The VSC also uses municipal pavilions in the metropolitan area.',
    'faq-a9': 'Yes, admission is free for families and fans. La Alqueria del Basket has capacity for more than 2,000 simultaneous spectators and has rest areas, a cafeteria and parking.',
    'faq-a10': 'La Alqueria del Basket has ample free parking for teams and families. For the VSC municipal pavilions, parking availability will be indicated in the tournament guide sent to registered teams.',
    'faq-a11': 'We have agreements with hotels and sports residences in Valencia at special rates for participating teams. Upon registration you will receive a guide with available options and prices. Accommodation is not included in the registration fee.',
    'faq-a12': 'The fee includes: full tournament participation, official refereeing, access to all facilities, trophies for the top three in each category, medals for all participating players, sports insurance, and the official tournament magazine in digital format.',
    'faq-a13': 'Yes. Participating teams have access to guided tours of La Alqueria del Basket, the possibility of attending Valencia Basket training sessions (subject to availability), and discounts at Valencia establishments through the VBC participant card.',
    'faq-a14': 'Yes. You can write to us through the <a href="contacto.html">contact form</a> or send us a direct message on Instagram. The organizing team responds within a maximum of 24 hours on working days.',
    /* NOTICIAS */
    'noticias-hero-tag': 'Latest',
    'noticias-hero-title': 'Latest <em>News</em>',
    'noticia1-fecha': 'June 15, 2026',
    'noticia1-titulo': 'Valencia Basket Cup 2027 opens registration with a historic record of applications in the first 48 hours',
    'noticia1-extracto1': 'The most prestigious basketball tournament in the Mediterranean has broken all its previous records in the first registration weekend. Over 120 teams from 15 different countries have already confirmed their participation in the edition to be held January 3–5 at La Alqueria del Basket.',
    'noticia1-extracto2': 'The tournament management attributes this unprecedented success to the consolidation of the VBC brand at European level and the constant improvement of the facilities at La Alqueria, the official home of Valencia Basket in the ACB. This year features new U10 and U12 female categories that have generated great excitement among participating clubs.',
    'noticia-leer-completo': 'Read full article →',
    'noticia2-fecha': 'June 10, 2026',
    'noticia2-titulo': 'Valencia International Cup 2027 confirms participation from teams from France, Italy and Portugal',
    'noticia2-extracto': 'The international spring event reinforces its European dimension with the addition of twelve clubs from the continent. The tournament, scheduled for March 25–28, 2027, expects to surpass 48 participating teams for the first time in its history.',
    'noticia-leer-mas': 'Read more →',
    'noticia3-fecha': 'June 28, 2026',
    'noticia3-titulo': 'CB Castellón crowned champion of the Valencia Summer Cup 2026 in an epic final',
    'noticia3-extracto': 'The Castellón side defeated Joventut B 68-64 in a final that went down to the wire at the Pabellón Municipal de Patraix. The VSC 2026 brought together over 800 players from across the Mediterranean arc.',
    'noticia4-fecha': 'June 5, 2026',
    'noticia4-titulo': 'Valencia Basket Club signs a collaboration agreement with VBC for talent scouting',
    'noticia4-extracto': 'The ACB club becomes a strategic partner of the tournament and will send scouts to observe the best U16 and U18 players. A historic step that reinforces the VBC\'s projection as a top youth development platform in Spain.',
    'noticia5-fecha': 'May 20, 2026',
    'noticia5-titulo': 'Turisme Comunitat Valenciana renews its sponsorship with VIC for three seasons',
    'noticia5-extracto': 'The regional institution will back the tournament as a showcase for Valencia as an international sports tourism destination. The agreement includes promotional activities in Northern and Eastern European markets.',
    'noticia6-fecha': 'May 2, 2026',
    'noticia6-titulo': 'VBC launches its scholarship programme for underfunded clubs in rural Valencia',
    'noticia6-extracto': 'Up to six teams will be able to participate free of charge thanks to the solidarity fund created by the organizers. The programme aims to democratize access to high-level youth competition beyond major urban centres.',
    /* REVISTA */
    'revista-hero-tag': 'Official editions',
    'revista-hero-title': 'Valencia Basket Cup<br/><em>Magazine</em>',
    'revista-hero-sub': 'Exclusive features · Statistics · Professional photography',
    'revista-strip': 'Relive every tournament  ·  Exclusive interviews  ·  Best moments  ·  High-quality photography  ·  Exclusive features  ·  Statistics and results  · ',
    'revista-coleccion-tag': 'Collection',
    'revista-coleccion-title': 'Our <em>Editions</em>',
    'revista-vbc-year': 'January 2027',
    'revista-vbc-desc': 'January 3 — 5, 2027 · La Alqueria del Basket',
    'revista-leer': 'Read magazine',
    'revista-vic-badge': 'Special edition',
    'revista-vic-year': 'March 2027',
    'revista-vic-desc': 'March 25 — 28, 2027 · La Alqueria del Basket',
    'revista-vsc-year': 'June 2026',
    'revista-vsc-desc': 'June 25 — 27, 2026 · La Alqueria del Basket',
    /* GALERIA */
    'galeria-hero-tag': 'Moments',
    'galeria-hero-title': 'Image <em>Gallery</em>',
    'galeria-filter-all': 'All',
    /* PAGOS */
    'pagos-hero-tag': 'Registration',
    'pagos-hero-title': 'Payment <em>Process</em>',
    'pagos-step1-title': 'Choose your tournament',
    'pagos-step1-desc': 'Select the tournament and category you wish to compete in.',
    'pagos-step2-title': 'Complete the form',
    'pagos-step2-desc': 'Fill in your team and player details.',
    'pagos-step3-title': 'Make payment',
    'pagos-step3-desc': 'Secure payment by credit card or bank transfer.',
    'pagos-step4-title': 'Confirmation',
    'pagos-step4-desc': 'You will receive a confirmation email with all the details.',
    'pagos-vbc-fecha': 'Jan 3–5, 2027',
    'pagos-vic-fecha': 'Mar 25–28, 2027',
    'pagos-vsc-fecha': 'Jun 25–27, 2026',
    'pagos-period': '/ team',
    'pagos-feat1': '✓ Full registration',
    'pagos-feat2': '✓ Officiating included',
    'pagos-feat3': '✓ Official tournament jersey',
    'pagos-feat4': '✓ Access to digital magazine',
    'pagos-feat5': '✓ Trophies and medals',
    'pagos-feat4b': '✓ Access to printed magazine',
    'pagos-feat6': '✓ Official team photo',
    'pagos-feat3b': '✓ Official kit pack',
    'pagos-popular': 'Most Popular',
    'pagos-btn-vbc': 'Register for VBC',
    'pagos-btn-vic': 'Register for VIC',
    'pagos-btn-vsc': 'Register for VSC',
    'pagos-metodos-label': 'Accepted payment methods',
    'pagos-metodo-tarjeta': '💳 Card',
    'pagos-metodo-transferencia': '🏦 Bank transfer',
    'pagos-metodo-bizum': '📱 Bizum',
    'pagos-metodo-paypal': '🌐 PayPal',
    /* CONTACTO */
    'contacto-hero-tag': 'Contact',
    'contacto-hero-title': 'Do you have <em>questions?</em>',
    'contacto-label-nombre': 'Club / team name',
    'contacto-placeholder-nombre': 'Valencia Basketball Club',
    'contacto-label-email': 'Email',
    'contacto-label-torneo': 'Tournament of interest',
    'contacto-select-default': 'Select a tournament...',
    'contacto-label-mensaje': 'Message',
    'contacto-placeholder-mensaje': 'Write your inquiry here...',
    'contacto-btn-enviar': 'Send message',
    'contacto-info-ubicacion': 'Location',
    'contacto-info-email-label': 'Email',
    'contacto-info-redes': 'Social Media',
    /* ARTICULOS */
    'articulo-back': '← Back to News',
    'noticia1-hero-fecha': 'June 15, 2026',
    'noticia1-hero-h1': 'Valencia Basket Cup 2027 opens registration with a historic record of applications in the first 48 hours',
    'noticia1-lead': 'The most prestigious basketball tournament in the Mediterranean has broken all its previous records in the first registration weekend. Over 120 teams from 15 countries have already confirmed their participation for the January 3–5 edition at La Alqueria del Basket.',
    'noticia1-p1': 'The tournament management attributes this unprecedented success to the consolidation of the VBC brand at European level and the constant improvement of the facilities at La Alqueria, the official home of Valencia Basket in the ACB. This year features new U10 and U12 female categories that have generated great excitement among participating clubs.',
    'noticia1-p2': '"We are facing the most ambitious edition in our history," said the tournament director. "The response from European clubs confirms that Valencia has become a benchmark for youth basketball development at the continental level."',
    'noticia1-h2-1': 'New categories and expanded format',
    'noticia1-p3': 'The VBC 2027 will feature female U10 and U12 categories for the first time, a long-standing demand from participating clubs. The format also expands with a new elite division for U16 and U18 teams with the best performance in previous editions.',
    'noticia1-p4': 'The tournament will be held entirely at La Alqueria del Basket facilities, which has six approved competition courts and capacity for more than 2,000 simultaneous spectators.',
    'noticia1-h2-2': 'International participation',
    'noticia1-p5': 'Among the 120 already registered teams are clubs from France, Italy, Portugal, Germany, the United Kingdom, the Netherlands, Belgium, Poland and Sweden, consolidating the truly international character of the tournament. Spain contributes the largest number of teams, with representation from twelve autonomous communities.',
    'noticia1-p6': 'Registrations will remain open until October 15, 2026 or until the maximum capacity of 160 teams is reached.',
    'articulo-btn-inscribir': 'Register now',
    'articulo-btn-noticias': 'More news',
    'sidebar-torneos-title': 'Upcoming tournaments',
    'sidebar-inscripcion-title': 'Registration',
    'sidebar-inscripcion-p': 'Limited spots. Register your team now.',
    'sidebar-ver-precios': 'View prices →',
    'sidebar-li-vbc': '<strong>Valencia Basket Cup</strong>January 3 — 5, 2027',
    'sidebar-li-vic': '<strong>Valencia International Cup</strong>March 25 — 28, 2027',
    'sidebar-li-vsc': '<strong>Valencia Summer Cup</strong>June 25 — 27, 2026',
    'noticia2-hero-fecha': 'June 10, 2026',
    'noticia2-hero-h1': 'Valencia International Cup 2027 confirms participation from teams from France, Italy and Portugal',
    'noticia2-lead': 'The international spring event reinforces its European dimension with the addition of twelve clubs from the continent. The tournament, scheduled for March 25–28, 2027, expects to surpass 48 participating teams for the first time in its history.',
    'noticia2-p1': 'The Valencia International Cup has established itself as the reference tournament for European clubs seeking to compete in a professional environment in Spain. The organization has this year strengthened contacts with federations from France, Italy and Portugal to ensure maximum continental representation.',
    'noticia2-p2': 'The organization works to offer the best possible experience to all participants: professional officiating, top-level facilities at La Alqueria del Basket, coordinated accommodation and complementary activities in the city of Valencia.',
    'noticia2-h2-1': 'Details and registration',
    'noticia2-p3': 'Interested teams can complete their registration through the Registration section of this website. The number of spots is limited and allocated on a strict first-come, first-served basis. The tournament includes official refereeing, trophies for all participants and access to La Alqueria facilities.',
    'noticia2-p4': 'For any additional queries, the organizing team is available through the contact form or at the official tournament email address.',
    'noticia3-hero-fecha': 'June 28, 2026',
    'noticia3-hero-h1': 'CB Castellón crowned champion of the Valencia Summer Cup 2026 in an epic final',
    'noticia3-lead': 'The Castellón side defeated Joventut B 68-64 in a final that went down to the wire at the Pabellón Municipal de Patraix. The VSC 2026 brought together over 800 players from across the Mediterranean arc.',
    'noticia3-p1': 'The match, played in front of a packed pavilion, was a spectacle from start to finish. CB Castellón overturned an eight-point deficit in the final quarter to clinch the title in a thrilling finale.',
    'noticia3-p2': 'The organization works to offer the best possible experience to all participants: professional officiating, top-level facilities at La Alqueria del Basket, coordinated accommodation and complementary activities in the city of Valencia.',
    'noticia3-h2-1': 'Details and registration',
    'noticia3-p3': 'Interested teams can complete their registration through the Registration section of this website. The number of spots is limited and allocated on a strict first-come, first-served basis. The tournament includes official refereeing, trophies for all participants and access to La Alqueria facilities.',
    'noticia3-p4': 'For any additional queries, the organizing team is available through the contact form or at the official tournament email address.',
    'noticia4-hero-fecha': 'June 5, 2026',
    'noticia4-hero-h1': 'Valencia Basket Club signs a collaboration agreement with VBC for talent scouting',
    'noticia4-lead': 'The ACB club becomes a strategic partner of the tournament and will send scouts to observe the best U16 and U18 players. A historic step that reinforces the VBC\'s projection as a top youth development platform in Spain.',
    'noticia4-p1': 'The agreement, signed at La Alqueria del Basket, establishes that Valencia Basket\'s technical staff will evaluate the most outstanding players at the tournament, with the possibility of offering trials at their academy to the most promising talents.',
    'noticia4-p2': 'The organization works to offer the best possible experience to all participants: professional officiating, top-level facilities at La Alqueria del Basket, coordinated accommodation and complementary activities in the city of Valencia.',
    'noticia4-h2-1': 'Details and registration',
    'noticia4-p3': 'Interested teams can complete their registration through the Registration section of this website. The number of spots is limited and allocated on a strict first-come, first-served basis. The tournament includes official refereeing, trophies for all participants and access to La Alqueria facilities.',
    'noticia4-p4': 'For any additional queries, the organizing team is available through the contact form or at the official tournament email address.',
    'noticia5-hero-fecha': 'May 20, 2026',
    'noticia5-hero-h1': 'Turisme Comunitat Valenciana renews its sponsorship with VIC for three seasons',
    'noticia5-lead': 'The regional institution will back the tournament as a showcase for Valencia as an international sports tourism destination. The agreement includes promotional activities in Northern and Eastern European markets.',
    'noticia5-p1': 'The Valencia International Cup tournament has become an ambassador for sports tourism in the Valencian Community, attracting hundreds of families from across Europe each year who combine competition with a visit to the city.',
    'noticia5-p2': 'The organization works to offer the best possible experience to all participants: professional officiating, top-level facilities at La Alqueria del Basket, coordinated accommodation and complementary activities in the city of Valencia.',
    'noticia5-h2-1': 'Details and registration',
    'noticia5-p3': 'Interested teams can complete their registration through the Registration section of this website. The number of spots is limited and allocated on a strict first-come, first-served basis. The tournament includes official refereeing, trophies for all participants and access to La Alqueria facilities.',
    'noticia5-p4': 'For any additional queries, the organizing team is available through the contact form or at the official tournament email address.',
    'noticia6-hero-fecha': 'May 2, 2026',
    'noticia6-hero-h1': 'VBC launches its scholarship programme for underfunded clubs in rural Valencia',
    'noticia6-lead': 'Up to six teams will be able to participate free of charge thanks to the solidarity fund created by the organizers. The programme aims to democratize access to high-level youth competition beyond major urban centres.',
    'noticia6-p1': 'The VBC scholarship programme was created with the mission of making high-level sport accessible to all young people in the Valencian Community, regardless of their place of origin or economic situation.',
    'noticia6-p2': 'The organization works to offer the best possible experience to all participants: professional officiating, top-level facilities at La Alqueria del Basket, coordinated accommodation and complementary activities in the city of Valencia.',
    'noticia6-h2-1': 'Details and registration',
    'noticia6-p3': 'Interested teams can complete their registration through the Registration section of this website. The number of spots is limited and allocated on a strict first-come, first-served basis. The tournament includes official refereeing, trophies for all participants and access to La Alqueria facilities.',
    'noticia6-p4': 'For any additional queries, the organizing team is available through the contact form or at the official tournament email address.',
    /* ALIASES — keys used in HTML */
    'footer-brand-desc': 'International youth basketball tournament. We want your team to be part of the reference tournament in youth basketball.',
    'footer-visit-shop': 'Visit Valencia Shop',
    'subscribe-btn': 'Subscribe',
    'subscribe-placeholder': 'Your email address',
    'articulo-btn-inscribirse': 'Register now',
    'articulo-sidebar-torneos-title': 'Upcoming tournaments',
    'articulo-sidebar-vbc-fecha': 'January 3 — 5, 2027',
    'articulo-sidebar-vic-fecha': 'March 25 — 28, 2027',
    'articulo-sidebar-vsc-fecha': 'June 25 — 27, 2026',
    'articulo-sidebar-inscripcion-title': 'Registration',
    'articulo-sidebar-inscripcion-desc': 'Limited spots. Register your team now.',
    'articulo-sidebar-btn': 'View prices →',
    'contacto-ubicacion-label': 'Location',
    'contacto-ubicacion-text': 'La Alqueria del Basket<br/>Av. dels Tarongers, s/n<br/>46022 Valencia',
    'contacto-email-label': 'Email',
    'contacto-redes-label': 'Social Media',
    'pagos-per-equipo': '/ team',
    /* NOTICIA ARTICLE KEYS */
    'n1-date': 'June 15, 2026',
    'n1-title': 'Valencia Basket Cup 2027 opens registration with a historic record of applications in the first 48 hours',
    'n1-lead': 'The most prestigious basketball tournament in the Mediterranean has broken all its previous records in the first registration weekend. Over 120 teams from 15 countries have already confirmed their participation for the January 3–5 edition at La Alqueria del Basket.',
    'n2-date': 'June 10, 2026',
    'n2-title': 'Valencia International Cup 2027 confirms participation from teams from France, Italy and Portugal',
    'n2-lead': 'The international spring event reinforces its European dimension with the addition of twelve clubs from the continent. The tournament, scheduled for March 25–28, 2027, expects to surpass 48 participating teams for the first time in its history.',
    'n3-date': 'June 28, 2026',
    'n3-title': 'CB Castellón crowned champion of the Valencia Summer Cup 2026 in an epic final',
    'n3-lead': 'The Castellón side defeated Joventut B 68-64 in a final that went down to the wire at the Pabellón Municipal de Patraix. The VSC 2026 brought together over 800 players from across the Mediterranean arc.',
    'n4-date': 'June 5, 2026',
    'n4-title': 'Valencia Basket Club signs a collaboration agreement with VBC for talent scouting',
    'n4-lead': 'The ACB club becomes a strategic partner of the tournament and will send scouts to observe the best U16 and U18 players. A historic step that reinforces the VBC\'s projection as a top youth development platform in Spain.',
    'n5-date': 'May 20, 2026',
    'n5-title': 'Turisme Comunitat Valenciana renews its sponsorship with VIC for three seasons',
    'n5-lead': 'The regional institution will back the tournament as a showcase for Valencia as an international sports tourism destination. The agreement includes promotional activities in Northern and Eastern European markets.',
    'n6-date': 'May 2, 2026',
    'n6-title': 'VBC launches its scholarship programme for underfunded clubs in rural Valencia',
    'n6-lead': 'Up to six teams will be able to participate free of charge thanks to the solidarity fund created by the organizers. The programme aims to democratize access to high-level youth competition beyond major urban centres.',
  }
};

function applyLanguage(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    if (t[el.dataset.i18nHtml]) el.innerHTML = t[el.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    if (t[el.dataset.i18nPlaceholder]) el.placeholder = t[el.dataset.i18nPlaceholder];
  });
  document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('vbc-lang', lang);
}

const langBtns = document.querySelectorAll('.lang-switcher__btn');
langBtns.forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
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
