/* VBC extras: botón de WhatsApp y destacado del enlace de Inscripción.
   Solo añade elementos nuevos; no modifica fotos ni textos de la web. */
(function () {
  try {
    var css = document.createElement('style');
    css.textContent =
      '.nav__links a[href="pagos.html"]{background:#FF6B00;color:#fff!important;padding:9px 16px;border-radius:4px}' +
      '.nav__links a[href="pagos.html"]::after{display:none!important}' +
      '.nav__links a[href="pagos.html"]:hover{filter:brightness(1.1)}' +
      '.vbc-whatsapp{position:fixed;right:20px;bottom:150px;z-index:8000;width:54px;height:54px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(37,211,102,.45);transition:transform .2s}' +
      '.vbc-whatsapp:hover{transform:scale(1.08)}' +
      '.vbc-whatsapp svg{width:30px;height:30px;fill:#fff}' +
      '@media(max-width:600px){.vbc-whatsapp{width:48px;height:48px;bottom:140px;right:14px}}';
    document.head.appendChild(css);

    var a = document.createElement('a');
    a.className = 'vbc-whatsapp';
    a.href = 'https://wa.me/34670386418?text=' + encodeURIComponent('Hola, quiero información para inscribir a mi equipo en Valencia Basket Cup.');
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'WhatsApp');
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.003 3C9.373 3 4 8.373 4 15c0 2.385.697 4.607 1.894 6.48L4 29l7.7-1.857A11.94 11.94 0 0 0 16.003 27C22.633 27 28 21.627 28 15S22.633 3 16.003 3zm0 21.8a9.77 9.77 0 0 1-4.98-1.363l-.357-.213-3.67.885.92-3.58-.233-.37A9.77 9.77 0 0 1 6.2 15c0-5.413 4.39-9.8 9.803-9.8 5.41 0 9.797 4.387 9.797 9.8s-4.387 9.8-9.797 9.8zm5.37-7.34c-.295-.147-1.743-.86-2.013-.958-.27-.1-.467-.147-.663.147-.197.295-.76.958-.93 1.155-.172.197-.344.222-.64.074-.295-.147-1.244-.458-2.37-1.46-.876-.78-1.467-1.745-1.64-2.04-.17-.295-.018-.455.13-.6.133-.132.295-.344.443-.516.148-.172.197-.295.295-.49.1-.198.05-.37-.024-.516-.074-.148-.663-1.6-.908-2.19-.24-.575-.483-.497-.663-.506l-.565-.01c-.197 0-.516.074-.787.37-.27.295-1.033 1.01-1.033 2.46s1.057 2.853 1.205 3.05c.147.197 2.08 3.176 5.04 4.454.704.304 1.254.485 1.683.62.707.225 1.35.193 1.858.117.567-.085 1.743-.713 1.99-1.4.245-.688.245-1.277.172-1.4-.074-.123-.27-.197-.565-.345z"/></svg>';
    document.body.appendChild(a);
  } catch (e) {}

  /* Aviso de Training Stages: aparece al entrar en la web (una vez por visita). */
  try {
    var ann = document.getElementById('tsAnnounce');
    if (ann && !sessionStorage.getItem('vbc_ts_visita')) {
      sessionStorage.setItem('vbc_ts_visita', '1');
      setTimeout(function () { ann.classList.add('open'); }, 1200);
    }
  } catch (e) {}
})();

/* Traducciones de los enlaces a la guía para clubes (se añaden al sistema de idiomas de main.js). */
(function () {
  try {
    if (typeof translations === 'undefined' || typeof applyLanguage !== 'function') return;
    var T = {"es": {"g-footer": "Guía para clubes", "g-bn-t": "Guía para clubes: cómo participar en un torneo en Valencia", "g-bn-p": "Fechas, categorías de U10 a U19, inscripción paso a paso y todo lo que incluye.", "g-bn-b": "Leer la guía →"}, "en": {"g-footer": "Guide for clubs", "g-bn-t": "Guide for clubs: how to take part in a tournament in Valencia", "g-bn-p": "Dates, categories from U10 to U19, step-by-step registration and everything that is included.", "g-bn-b": "Read the guide →"}, "fr": {"g-footer": "Guide pour les clubs", "g-bn-t": "Guide pour les clubs : comment participer à un tournoi à Valence", "g-bn-p": "Dates, catégories de U10 à U19, inscription pas à pas et tout ce qui est inclus.", "g-bn-b": "Lire le guide →"}, "it": {"g-footer": "Guida per i club", "g-bn-t": "Guida per i club: come partecipare a un torneo a Valencia", "g-bn-p": "Date, categorie da U10 a U19, iscrizione passo dopo passo e tutto ciò che è incluso.", "g-bn-b": "Leggi la guida →"}, "pt": {"g-footer": "Guia para clubes", "g-bn-t": "Guia para clubes: como participar num torneio em Valência", "g-bn-p": "Datas, categorias de U10 a U19, inscrição passo a passo e tudo o que está incluído.", "g-bn-b": "Ler o guia →"}};
    Object.keys(T).forEach(function (l) { if (translations[l]) Object.assign(translations[l], T[l]); });
    var saved = localStorage.getItem('vbc-lang');
    if (saved && saved !== 'es' && translations[saved]) applyLanguage(saved);
  } catch (e) {}
})();

/* Google Analytics 4 + conversiones. Solo se activa si el visitante acepta las cookies. */
(function () {
  var GA_ID = 'G-FZ7540N0JK';
  var started = false;

  function track(name, params) {
    if (!started || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function start() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  try {
    var consent = localStorage.getItem('vbc_cookies');
    if (consent === 'accepted') start();
    var acc = document.getElementById('cookieAccept');
    if (acc) acc.addEventListener('click', start);
  } catch (e) {}

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var page = location.pathname;
    if (href.indexOf('wa.me') !== -1) track('click_whatsapp', { page: page });
    else if (href.indexOf('pagos.html') !== -1) track('click_inscripcion', { page: page });
    else if (href.indexOf('guia-clubes.html') !== -1) track('click_guia_clubes', { page: page });
    else if (href.indexOf('mailto:') === 0) track('click_email', { page: page });
    else if (href.indexOf('tel:') === 0) track('click_telefono', { page: page });
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target, id = f && f.id;
    if (id === 'contactForm') track('generate_lead', { form: 'contacto', page: location.pathname });
    else if (id === 'subscribeForm') track('sign_up', { form: 'newsletter', page: location.pathname });
  }, true);
})();
