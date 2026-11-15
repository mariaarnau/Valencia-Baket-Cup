# Resumen del proyecto — Valencia Basket Cup (valenciabasketcup.com)

## Cómo funciona este proyecto
- Repositorio: `mariaarnau/Valencia-Baket-Cup`, rama de trabajo: `claude/web-changes-biw02j`.
- Web estática (HTML + CSS + JS, sin backend), alojada en **WebEmpresa** (panel **WePanel**, cPanel-style).
- Claude edita los archivos localmente, hace commit/push a GitHub, y **manda un zip** con los archivos cambiados para que la usuaria lo suba a WePanel (`public_html/valenciabasketcup.com/`) y lo extraiga con "Extraer aquí", confirmando sobrescribir.
- Claude **no tiene acceso** a WePanel ni a `valenciabasketcup.com` (bloqueado por red) — todo lo que pasa en el hosting depende de que la usuaria lo suba y lo confirme.

## Reglas importantes (pedidas explícitamente)
1. **Solo tocar lo que se pide**, nada más — no mover ni cambiar cosas no solicitadas.
2. Cuidar que todo se vea bien tanto en **móvil como en ordenador**.
3. Tener en cuenta las **traducciones** (la web tiene 5 idiomas: ES, EN, FR, IT, PT, gestionados en `js/main.js`). Cualquier texto que se cambie en español debe reflejarse también en main.js para los otros 4 idiomas si aplica.
4. Antes de dar por hecho un cambio, verificar que no queden referencias antiguas sueltas (buscar en todos los .html y en main.js).

## Errores que causaron confusión — para no repetirlos
- **WePanel a veces crea copias duplicadas** (`index-3.html`, `index-9.html`, etc.) en vez de sobrescribir, si no se confirma "sobrescribir" al extraer o subir. Solo `index.html` (sin número) es el que usa la web real. Si aparecen duplicados, hay que borrarlos y asegurarse de que el archivo bueno se llama exactamente igual que el original.
- **El navegador de la usuaria también duplica descargas** (`index (9).html`) si descarga el mismo nombre varias veces — hay que renombrar a `index.html` antes de subir, o borrar descargas previas.
- **Los archivos deben tener permisos 644** en el servidor — si un PDF u otro archivo da error 403, revisar permisos (WePanel: clic derecho → "Cambiar modo").
- **Caché**: el CSS se sirve como `css/style.css?v=2` y el JS como `js/main.js?v=11` — si se edita alguno de los dos, **hay que subir el número de versión** en todos los `.html` para forzar que los navegadores (incluso los que ya visitaron antes) descarguen la versión nueva. Olvidarse de esto fue la causa de varios "no se actualiza" durante la sesión.
- **PDFs en iframe no funcionan bien en móvil** (se ve solo la portada) — por eso `openPDF()`/`openLocalPDF()` en `js/main.js` detectan móvil y abren el PDF en pestaña nueva en vez de en el recuadro emergente.
- Si alguna vez se sube por error un zip antiguo y "se rompe" la web (vuelve a un estado anterior), **no hay que asustarse**: todo el historial de cambios está en git, así que Claude puede regenerar y volver a mandar el estado correcto en cualquier momento.

## Cosas ya hechas (resumen cronológico)
1. Modo mantenimiento (activado y luego desactivado) mientras se hacían cambios.
2. Quitado el apartado "Instalaciones" del menú, footer y sitemap (la página `instalaciones.html` se dejó sin enlazar, para reinstalarla más adelante con contenido distinto — **pendiente**).
3. Quitado el vídeo y el logo de L'Alqueria del menú/portada.
4. Sección "Opiniones" renombrada a "Testimonios", con 4 personas nuevas (Mando Kabaya, Gonzalo, Dereck, Davide) en los 5 idiomas.
5. Restaurado un carrusel de imágenes de fondo en el hero de la portada (`hero-slide-1.jpg` a `5.jpg`).
6. Barrido completo del sitio eliminando menciones a "L'Alqueria del Basket" y "Fuente de San Luis" (noticias, contacto, revista, chatbot, FAQ...), dejando solo "Valencia".
7. Categorías unificadas a **Sub-10/U10 hasta Sub-19/U19** en los 3 torneos (VBC, VIC, VSC). Equipos: VBC 62+, VIC 118+, VSC 74+.
8. Quitado el campo "Sede" y la sección dedicada a la sede en cada torneo.
9. Lista "incluido en la inscripción": "City Tour por Valencia" → "Descuentos City Tour Valencia"; quitado "Fiesta de equipo".
10. Precios de inscripción actualizados **por jugador** (antes por equipo): VBC 275€, VIC 375€, VSC 275€. Solo queda **Transferencia** como método de pago (quitados Tarjeta, Bizum, PayPal).
11. Las 3 revistas (VBC, VIC, VSC) sustituidas por las nuevas, **alojadas directamente en el servidor** (no en Google Drive) para que las tres se comporten igual en PC y móvil:
    - `revista_vbc.pdf`
    - `revista-vic.pdf` (nombre con guión, quedó así por cómo se creó primero — funciona igual)
    - `revista_vsc.pdf`
    - La revista VIC tuvo una versión con una página quitada ("El Escenario", con L'Alqueria) que luego se revirtió a petición de la usuaria — la versión final es la que ella mandó tal cual, sin editar.
12. Añadido un vídeo vertical (`reel.mp4`, ya en el hosting) entre el mapa mundial y testimonios, con texto "Así se vive la experiencia Valencia International Cup" al lado (estilo iguial al resto de la web).
13. Corregido testimonio de Gonzalo: bandera y país de Portugal (no España).
14. Unificado el segundo enlace de "Últimas Noticias" del footer en todas las páginas (Training Stages, no CB Castellón).
15. Quitado el bloque de FAQ "Instalaciones y acceso" en `torneos.html`.
16. Categorías corregidas en la noticia/blog de la VBC (antes decía U14-U18 mal).
17. Favicon creado ("VBC" naranja sobre negro) y enlazado en las 21 páginas — para que Google lo recoja hace falta que re-rastree la web (puede tardar días/semanas, no es instantáneo).

## Pendiente / cosas que quedaron para más adelante
- Reinstalar la sección "Instalaciones" con contenido e imágenes **distintas** (aún no se ha hecho, solo se quitó).
- Hay dos páginas huérfanas sin enlazar desde ningún sitio, con contenido antiguo (mencionan L'Alqueria): `instalaciones.html` y `previewvbc.html`. No se han tocado porque no son visibles para nadie, pero si se quiere limpiar el hosting del todo, están ahí.
- Confirmar que Google ya muestra el favicon nuevo (puede tardar).

## Archivos clave
- `index.html` — portada.
- `torneos.html`, `torneo-vbc.html`, `torneo-vic.html`, `torneo-vsc.html` — torneos.
- `revista.html` — página de revistas.
- `pagos.html` — inscripción/precios.
- `contacto.html`, `noticias.html`, `noticia-1.html` a `noticia-6.html`, `galeria.html`, `aviso-legal.html`, `privacidad.html`, `cookies.html`.
- `css/style.css` (versión `?v=2`).
- `js/main.js` (versión `?v=11`) — incluye todas las traducciones (5 idiomas) y funciones como `openPDF()`, `openLocalPDF()`, `applyLanguage()`.
