/* Formulario de solicitud de información (leads). Se muestra donde exista <div id="vbcLeadMount">.
   Envía a Formspree (correo a la organización). */
(function () {
  var mount = document.getElementById('vbcLeadMount');
  if (!mount) return;
  var ENDPOINT = 'https://formspree.io/f/xppzrnno';
  var TR = {"es": {"title": "Solicita información para tu club", "sub": "Cuéntanos qué necesitas y te enviamos el dosier técnico y las condiciones. Respondemos en menos de 48 horas.", "club": "Nombre del club", "name": "Tu nombre", "email": "Email", "phone": "Teléfono / WhatsApp (opcional)", "country": "País", "torneo": "Torneo de interés", "t0": "Selecciona…", "t4": "Aún no lo sé", "cats": "Categorías", "teams": "Nº de equipos", "msg": "Mensaje (opcional)", "priv": "Acepto que R&O Eventos Deportivos trate mis datos para responder a mi consulta, según la <a href=\"privacidad.html\" target=\"_blank\">Política de Privacidad</a>.", "news": "Quiero recibir novedades e inscripciones anticipadas por correo (opcional).", "send": "Enviar solicitud", "sending": "Enviando…", "ok": "¡Gracias! Hemos recibido tu solicitud y te responderemos en menos de 48 horas.", "err": "No se ha podido enviar. Inténtalo de nuevo o escríbenos por WhatsApp."}, "en": {"title": "Request information for your club", "sub": "Tell us what you need and we will send you the technical dossier and conditions. We reply within 48 hours.", "club": "Club name", "name": "Your name", "email": "Email", "phone": "Phone / WhatsApp (optional)", "country": "Country", "torneo": "Tournament of interest", "t0": "Select…", "t4": "Not sure yet", "cats": "Categories", "teams": "Number of teams", "msg": "Message (optional)", "priv": "I agree that R&O Eventos Deportivos processes my data to answer my enquiry, according to the <a href=\"privacidad.html\" target=\"_blank\">Privacy Policy</a>.", "news": "I would like to receive news and early-registration offers by email (optional).", "send": "Send request", "sending": "Sending…", "ok": "Thank you! We have received your request and will reply within 48 hours.", "err": "It could not be sent. Please try again or write to us on WhatsApp."}, "fr": {"title": "Demandez des informations pour votre club", "sub": "Dites-nous ce dont vous avez besoin et nous vous enverrons le dossier technique et les conditions. Nous répondons sous 48 heures.", "club": "Nom du club", "name": "Votre nom", "email": "E-mail", "phone": "Téléphone / WhatsApp (facultatif)", "country": "Pays", "torneo": "Tournoi souhaité", "t0": "Sélectionner…", "t4": "Je ne sais pas encore", "cats": "Catégories", "teams": "Nombre d'équipes", "msg": "Message (facultatif)", "priv": "J'accepte que R&O Eventos Deportivos traite mes données pour répondre à ma demande, conformément à la <a href=\"privacidad.html\" target=\"_blank\">Politique de confidentialité</a>.", "news": "Je souhaite recevoir les nouveautés et offres d'inscription anticipée par e-mail (facultatif).", "send": "Envoyer la demande", "sending": "Envoi…", "ok": "Merci ! Nous avons bien reçu votre demande et vous répondrons sous 48 heures.", "err": "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp."}, "it": {"title": "Richiedi informazioni per il tuo club", "sub": "Raccontaci di cosa hai bisogno e ti invieremo il dossier tecnico e le condizioni. Rispondiamo entro 48 ore.", "club": "Nome del club", "name": "Il tuo nome", "email": "E-mail", "phone": "Telefono / WhatsApp (facoltativo)", "country": "Paese", "torneo": "Torneo di interesse", "t0": "Seleziona…", "t4": "Non lo so ancora", "cats": "Categorie", "teams": "N.º di squadre", "msg": "Messaggio (facoltativo)", "priv": "Accetto che R&O Eventos Deportivos tratti i miei dati per rispondere alla mia richiesta, secondo la <a href=\"privacidad.html\" target=\"_blank\">Informativa sulla privacy</a>.", "news": "Desidero ricevere novità e offerte di iscrizione anticipata via e-mail (facoltativo).", "send": "Invia la richiesta", "sending": "Invio…", "ok": "Grazie! Abbiamo ricevuto la tua richiesta e ti risponderemo entro 48 ore.", "err": "Invio non riuscito. Riprova o scrivici su WhatsApp."}, "pt": {"title": "Pede informação para o teu clube", "sub": "Diz-nos o que precisas e enviamos o dossier técnico e as condições. Respondemos em menos de 48 horas.", "club": "Nome do clube", "name": "O teu nome", "email": "E-mail", "phone": "Telefone / WhatsApp (opcional)", "country": "País", "torneo": "Torneio de interesse", "t0": "Seleciona…", "t4": "Ainda não sei", "cats": "Categorias", "teams": "N.º de equipas", "msg": "Mensagem (opcional)", "priv": "Aceito que a R&O Eventos Deportivos trate os meus dados para responder ao meu pedido, de acordo com a <a href=\"privacidad.html\" target=\"_blank\">Política de Privacidade</a>.", "news": "Quero receber novidades e ofertas de inscrição antecipada por e-mail (opcional).", "send": "Enviar pedido", "sending": "A enviar…", "ok": "Obrigado! Recebemos o teu pedido e responderemos em menos de 48 horas.", "err": "Não foi possível enviar. Tenta novamente ou escreve-nos por WhatsApp."}};
  var CSS = '.vbc-lead{max-width:860px;margin:0 auto;background:var(--black-card,#141414);border:1px solid var(--black-border,#2a2a2a);border-top:3px solid var(--orange,#FF6B00);border-radius:14px;padding:38px 34px}'
   + '.vbc-lead h2{font-family:var(--font-display,serif);font-size:1.7rem;color:var(--white,#fff);margin:0 0 8px}'
   + '.vbc-lead h2::after{display:none!important}'
   + '.vbc-lead__sub{color:var(--white-muted,#aaa);font-size:.95rem;line-height:1.7;margin:0 0 24px}'
   + '.vbc-lead__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}'
   + '.vbc-lead label{display:block;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--white-muted,#aaa);margin-bottom:6px}'
   + '.vbc-lead input[type=text],.vbc-lead input[type=email],.vbc-lead input[type=tel],.vbc-lead input[type=number],.vbc-lead select,.vbc-lead textarea{width:100%;box-sizing:border-box;background:#0d0d0d;border:1px solid #333;border-radius:6px;color:#fff;padding:12px 14px;font-size:.95rem;font-family:inherit}'
   + '.vbc-lead input:focus,.vbc-lead select:focus,.vbc-lead textarea:focus{outline:none;border-color:var(--orange,#FF6B00)}'
   + '.vbc-lead__full{grid-column:1/-1}'
   + '.vbc-lead__chk{display:flex;gap:10px;align-items:flex-start;font-size:.82rem;line-height:1.6;color:var(--white-muted,#aaa);margin-top:14px;text-transform:none;letter-spacing:0;font-weight:400}'
   + '.vbc-lead__chk input{margin-top:4px;accent-color:#FF6B00}.vbc-lead__chk a{color:var(--orange,#FF6B00)}'
   + '.vbc-lead button{margin-top:22px;background:var(--orange,#FF6B00);color:#000;border:0;border-radius:3px;padding:15px 30px;font-size:.8rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}'
   + '.vbc-lead button:disabled{opacity:.6;cursor:wait}'
   + '.vbc-lead__msg{margin-top:16px;font-size:.92rem;line-height:1.6}.vbc-lead__msg.ok{color:#4cd37b}.vbc-lead__msg.err{color:#ff6b6b}'
   + '.vbc-lead__hp{position:absolute!important;left:-9999px!important}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  function lang() { try { var l = localStorage.getItem('vbc-lang'); return TR[l] ? l : 'es'; } catch (e) { return 'es'; } }
  function render() {
    var t = TR[lang()];
    mount.innerHTML =
      '<form class="vbc-lead" id="vbcLeadForm">'
      + '<h2>' + t.title + '</h2><p class="vbc-lead__sub">' + t.sub + '</p>'
      + '<div class="vbc-lead__grid">'
      + '<div><label for="vl-club">' + t.club + '</label><input type="text" id="vl-club" name="club" required></div>'
      + '<div><label for="vl-name">' + t.name + '</label><input type="text" id="vl-name" name="nombre" required></div>'
      + '<div><label for="vl-email">' + t.email + '</label><input type="email" id="vl-email" name="email" required></div>'
      + '<div><label for="vl-phone">' + t.phone + '</label><input type="tel" id="vl-phone" name="telefono"></div>'
      + '<div><label for="vl-country">' + t.country + '</label><input type="text" id="vl-country" name="pais" required></div>'
      + '<div><label for="vl-torneo">' + t.torneo + '</label><select id="vl-torneo" name="torneo"><option value="">' + t.t0 + '</option><option>VBC · 3–5 / 01 / 2027</option><option>VIC · 25–28 / 03 / 2027</option><option>VSC · 25–27 / 06 / 2027</option><option>Training Stages</option><option>' + t.t4 + '</option></select></div>'
      + '<div><label for="vl-cats">' + t.cats + '</label><input type="text" id="vl-cats" name="categorias" placeholder="U12, U14, U16…"></div>'
      + '<div><label for="vl-teams">' + t.teams + '</label><input type="number" min="1" max="30" id="vl-teams" name="num_equipos"></div>'
      + '<div class="vbc-lead__full"><label for="vl-msg">' + t.msg + '</label><textarea id="vl-msg" name="mensaje" rows="3"></textarea></div>'
      + '</div>'
      + '<input class="vbc-lead__hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '<label class="vbc-lead__chk"><input type="checkbox" id="vl-priv" required><span>' + t.priv + '</span></label>'
      + '<button type="submit">' + t.send + '</button>'
      + '<div class="vbc-lead__msg" id="vl-msgbox" role="status"></div>'
      + '</form>';
    document.getElementById('vbcLeadForm').addEventListener('submit', submit);
  }

  function submit(e) {
    e.preventDefault();
    var f = e.target, t = TR[lang()], box = document.getElementById('vl-msgbox'), btn = f.querySelector('button');
    box.className = 'vbc-lead__msg'; box.textContent = '';
    var data = {};
    new FormData(f).forEach(function (v, k) { data[k] = v; });
    data._subject = 'Nuevo LEAD · Valencia Basket Cup · ' + location.pathname;
    data.pagina = location.href;
    data.idioma = lang();
    btn.disabled = true; btn.textContent = t.sending;
    fetch(ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error('x'); return r; })
      .then(function () {
        box.className = 'vbc-lead__msg ok'; box.textContent = t.ok; f.reset(); btn.textContent = t.send; btn.disabled = false;
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form: 'lead_guia', page: location.pathname });
      })
      .catch(function () { box.className = 'vbc-lead__msg err'; box.textContent = t.err; btn.textContent = t.send; btn.disabled = false; });
  }

  render();
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.lang-switcher__btn')) setTimeout(render, 60);
  });
})();
