(function () {
  // Scroll reveal
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }
  // Card spotlight follows cursor
  document.querySelectorAll('a.card').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
  // Mobile menu
  var btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }
  // Remember chosen language
  document.querySelectorAll('a.lang').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lang', a.getAttribute('hreflang')); } catch (e) {}
    });
  });
  // Quote form -> WhatsApp (if configured) or email
  var form = document.getElementById('quote-form');
  if (form) {
    var out = form.querySelector('.form-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form), lines = [];
      form.querySelectorAll('label').forEach(function (l) {
        var f = l.querySelector('input,select,textarea');
        if (f && f.name) lines.push(l.firstChild.textContent.trim() + ': ' + (d.get(f.name) || ''));
      });
      var text = lines.join('\n'), wa = form.dataset.wa, mail = form.dataset.mail;
      var url = wa ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(text)
                   : 'mailto:' + mail + '?subject=' + encodeURIComponent(form.dataset.subject) + '&body=' + encodeURIComponent(text);
      if (out) out.textContent = form.dataset.ok;
      window.location.href = url;
    });
  }
  // Preselect service from ?s=slug
  var s = new URLSearchParams(location.search).get('s'), sel = document.querySelector('select[name=service]');
  if (s && sel) sel.value = s;
})();
