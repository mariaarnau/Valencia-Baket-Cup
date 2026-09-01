// Modo mantenimiento: muestra un overlay a pantalla completa mientras se editan cambios en la web.
// Para desactivarlo, pon MAINTENANCE_MODE en false.
(function () {
  var MAINTENANCE_MODE = false;

  if (!MAINTENANCE_MODE) return;

  document.documentElement.style.overflow = "hidden";

  var overlay = document.createElement("div");
  overlay.id = "maintenance-overlay";
  overlay.innerHTML =
    '<div class="maintenance-box">' +
      '<div class="maintenance-logo">VBC</div>' +
      '<h1>Estamos trabajando en la web</h1>' +
      '<p>Volvemos enseguida. Gracias por tu paciencia.</p>' +
    "</div>";

  var style = document.createElement("style");
  style.textContent =
    "#maintenance-overlay{position:fixed;inset:0;z-index:2147483647;background:#0b0f14;" +
    "display:flex;align-items:center;justify-content:center;text-align:center;" +
    "font-family:'Montserrat',Arial,sans-serif;color:#fff;padding:24px;}" +
    "#maintenance-overlay .maintenance-box{max-width:520px;}" +
    "#maintenance-overlay .maintenance-logo{font-family:'Playfair Display',serif;" +
    "font-weight:900;font-size:2.5rem;letter-spacing:2px;margin-bottom:24px;color:#f2a900;}" +
    "#maintenance-overlay h1{font-size:1.6rem;margin:0 0 12px;font-weight:700;}" +
    "#maintenance-overlay p{font-size:1rem;opacity:.8;margin:0;}";

  document.head.appendChild(style);

  function mount() {
    document.body.appendChild(overlay);
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
})();
