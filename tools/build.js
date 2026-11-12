// Genera el sitio estático bilingüe.  Uso:  node tools/build.js
const fs = require("fs");
const path = require("path");
const C = require("./config");
const { icon, van } = require("./icons");
const { CATEGORIES, ORDER } = require("./data/meta");
const L = { en: require("./data/en"), es: require("./data/es") };
const ROOT = path.join(__dirname, "..");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rv = ' class="rv"';

const P = {
  home: (l) => `/${l}/`,
  services: (l) => `/${l}/${L[l].ui.dir.services}/`,
  service: (l, slug) => `/${l}/${L[l].ui.dir.services}/${slug}/`,
  about: (l) => `/${l}/${L[l].ui.dir.about}/`,
  contact: (l) => `/${l}/${L[l].ui.dir.contact}/`,
};
const write = (rel, html) => {
  const f = path.join(ROOT, rel, "index.html");
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
};
const brand = (l) => (l === "en" ? C.brand : C.brandEs);
const tel = `tel:${C.phoneHref}`;
const wa = C.whatsapp ? `https://wa.me/${C.whatsapp}` : "";
const catIcon = (id) => CATEGORIES.find((c) => c.id === id).icon;

function head(l, title, desc, twin, jsonld) {
  const u = L[l].ui;
  return `<!doctype html>
<html lang="${l}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#070d18">
<link rel="canonical" href="${C.siteUrl}${twin[l]}">
<link rel="alternate" hreflang="en" href="${C.siteUrl}${twin.en}">
<link rel="alternate" hreflang="es" href="${C.siteUrl}${twin.es}">
<link rel="alternate" hreflang="x-default" href="${C.siteUrl}${twin.en}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%23ff6b1a'/%3E%3Ctext x='50' y='70' font-size='56' text-anchor='middle'%3E🔧%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css">
<script>document.documentElement.className+=" js"</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head><body>
<a class="skip" href="#main">${u.skip}</a>`;
}

function header(l, active, twin) {
  const u = L[l].ui;
  const link = (k, href) => `<a href="${href}"${active === k ? ' aria-current="page"' : ""}>${u.nav[k]}</a>`;
  return `<header class="site-header"><div class="wrap"><div class="bar">
<a class="logo" href="${P.home(l)}"><span class="mark">${icon("wrench")}</span>${esc(brand(l))}</a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav">${icon("menu")} ${u.menu}</button>
<nav class="nav" id="nav">${link("home", P.home(l))}${link("services", P.services(l))}${link("about", P.about(l))}${link("contact", P.contact(l))}
<div class="langsw" role="group" aria-label="Language / Idioma">${icon("globe")}${["en", "es"].map((x) => x === l ? `<span class="cur" aria-current="true">${x.toUpperCase()}</span>` : `<a class="lang" href="${twin[x]}" hreflang="${x}" lang="${x}" title="${L[x].ui.otherLabel === "English" ? "Español" : "English"}">${x.toUpperCase()}</a>`).join("")}</div>
<a class="btn btn-primary" href="${tel}">${icon("phone")} ${C.phone}</a></nav></div></div></header>`;
}

const hoursTable = (l) => `<table>${C.hours[l].map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`).join("")}</table>`;
const contactLines = (l) => `<a href="${tel}">${icon("phone")} ${C.phone}</a>${wa ? `<a href="${wa}">${icon("chat")} WhatsApp</a>` : ""}<a href="mailto:${C.email}">${icon("mail")} ${C.email}</a>${C.address ? `<span>${icon("pin")} ${esc(C.address)}</span>` : ""}`;

function footer(l) {
  const u = L[l].ui;
  return `<footer><div class="wrap"><div class="foot">
<div><a class="logo" href="${P.home(l)}"><span class="mark">${icon("wrench")}</span>${esc(brand(l))}</a><p>${u.footerNote}</p></div>
<div><h3>${u.contactTitle}</h3><p>${contactLines(l)}</p></div>
<div><h3>${u.hoursTitle}</h3>${hoursTable(l)}</div></div>
<p class="copy">© ${new Date().getFullYear()} ${esc(brand(l))}</p></div></footer>
<div class="sticky"><a class="btn btn-primary" href="${tel}">${icon("phone")} ${u.call}</a>${wa ? `<a class="btn btn-wa" href="${wa}">${icon("chat")} WhatsApp</a>` : `<a class="btn btn-ghost" href="${P.contact(l)}">${u.nav.contact}</a>`}</div>
<script src="/assets/js/main.js"></script></body></html>`;
}

const ctaBtns = (l, ghost = true) => {
  const u = L[l].ui;
  return `<div class="btns"><a class="btn btn-primary" href="${tel}">${icon("phone")} ${u.call} · ${C.phone}</a>${wa ? `<a class="btn btn-wa" href="${wa}">${icon("chat")} ${u.whatsapp}</a>` : ""}<a class="btn ${ghost ? "btn-ghost" : "btn-outline"}" href="${P.contact(l)}">${u.quote} ${icon("arrow")}</a></div>`;
};
const faqHtml = (items) => items.map(([q, a]) => `<details${rv}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

const ctaBand = (l) => {
  const u = L[l].ui;
  return `<section class="cta-sec"><div class="wrap"><div class="cta rv"><h2>${u.ctaTitle}</h2><p>${u.ctaSub}</p>${ctaBtns(l)}</div></div></section>`;
};

function quoteForm(l) {
  const u = L[l].ui, f = u.f;
  const opts = ORDER.map(([slug]) => `<option value="${esc(L[l].services[slug].name)}">${esc(L[l].services[slug].name)}</option>`).join("");
  return `<form id="quote-form" data-wa="${C.whatsapp}" data-mail="${C.email}" data-subject="${esc(u.formTitle)}" data-ok="${esc(f.ok)}">
<div class="two"><label>${f.name}<input name="name" required autocomplete="name"></label><label>${f.phone}<input name="phone" type="tel" required autocomplete="tel"></label></div>
<div class="two"><label>${f.car}<input name="car"></label><label>${f.location}<input name="location" autocomplete="postal-code"></label></div>
<label>${f.service}<select name="service"><option value="">${f.pick}</option>${opts}</select></label>
<label>${f.msg}<textarea name="msg" rows="4"></textarea></label>
<button class="btn btn-primary" type="submit">${f.send} ${icon("arrow")}</button><p class="form-msg note" role="status"></p></form>`;
}

function localBusiness(l) {
  return {
    "@context": "https://schema.org", "@type": "AutoRepair", name: brand(l), telephone: C.phoneHref, email: C.email,
    url: C.siteUrl, areaServed: C.areas.map((a) => ({ "@type": "City", name: a })), priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "08:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
    ],
  };
}

const page = (l, key, twin, body, title, desc, jsonld) =>
  head(l, title, desc, twin, jsonld) + header(l, key, twin) + `<main id="main">${body}</main>` + footer(l);

// ---------- Inicio ----------
function home(l) {
  const u = L[l].ui, d = L[l];
  const twin = { en: P.home("en"), es: P.home("es") };
  const cats = CATEGORIES.map((c) => {
    const items = ORDER.filter(([, cat]) => cat === c.id);
    return `<a class="card rv" href="${P.services(l)}#${c.id}"><div class="ibox">${icon(c.icon)}</div><h3>${c[l]}</h3>
<div class="tags">${items.map(([s]) => `<span>${esc(d.services[s].name)}</span>`).join("")}</div><span class="more">${u.allServices.split(" ")[0]} ${icon("arrow")}</span></a>`;
  }).join("");
  const stats = [[ORDER.length + "+", u.stats[0]], [C.areas.length + "+", u.stats[1]], ["24h", u.stats[2]], ["EN · ES", u.stats[3]]];
  const whyIcons = ["search", "wrench", "shield", "clock"];
  const body = `
<section class="hero"><div class="wrap hero-grid"><div>
<span class="pill"><span class="dot"></span>${u.openNow}</span>
<h1>${u.heroTitle}</h1><p class="lead">${u.heroSub}</p>${ctaBtns(l)}</div>
<div class="hero-art">${van}<div class="float f1">${icon("shield")}${u.trust[1]}</div><div class="float f2">${icon("clock")}${u.trust[2]}</div></div></div></section>
<section class="stats"><div class="wrap"><ul>${stats.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join("")}</ul></div></section>
<section><div class="wrap"><div class="section-head rv"><span class="eyebrow">${u.nav.services}</span><h2>${u.servicesTitle}</h2><p>${u.servicesSub}</p></div>
<div class="grid g3">${cats}</div><div class="btns"><a class="btn btn-outline" href="${P.services(l)}">${u.allServices} ${icon("arrow")}</a></div></div></section>
<section style="background:var(--surface)"><div class="wrap"><div class="section-head rv"><span class="eyebrow">01 — 03</span><h2>${u.howTitle}</h2></div>
<div class="steps"><div class="grid g3">${u.how.map(([t, p], i) => `<div class="step rv"><div class="num">0${i + 1}</div><h3>${t}</h3><p>${p}</p></div>`).join("")}</div></div></div></section>
<section class="dark"><div class="wrap"><div class="section-head rv"><span class="eyebrow">${u.whyTitle}</span><h2>${u.whyTitle}</h2></div>
<div class="grid g2">${u.why.map(([t, p], i) => `<div class="glass rv"><div class="ibox">${icon(whyIcons[i])}</div><h3>${t}</h3><p>${p}</p></div>`).join("")}</div></div></section>
<section><div class="wrap"><div class="section-head rv"><span class="eyebrow">${icon("pin")}</span><h2>${u.areaTitle}</h2><p>${u.areaSub}</p></div>
<div class="chips">${C.areas.map((a) => `<span class="chip rv">${icon("pin")} ${a}</span>`).join("")}</div></div></section>
<section style="background:var(--surface)"><div class="wrap"><div class="section-head rv"><h2>${u.reviewsTitle}</h2></div>
<div class="card review-ph rv"><div class="stars" style="justify-content:center">${[1, 2, 3, 4, 5].map(() => icon("star")).join("")}</div><p>${u.reviewsNote}</p></div></div></section>
<section><div class="wrap cols"><div><div class="section-head rv"><h2>${u.faqTitle}</h2></div>${faqHtml(d.homeFaq)}</div>
<div class="card sticky-card rv"><h3>${icon("clock")} ${u.hoursTitle}</h3>${hoursTable(l)}</div></div></section>
${ctaBand(l)}`;
  return page(l, "home", twin, body, u.title.home, u.desc, localBusiness(l));
}

// ---------- Servicios ----------
function servicesHub(l) {
  const u = L[l].ui, d = L[l];
  const twin = { en: P.services("en"), es: P.services("es") };
  const sections = CATEGORIES.map((c) => {
    const items = ORDER.filter(([, cat]) => cat === c.id);
    return `<div class="cat" id="${c.id}"><div class="cat-head rv"><div class="ibox">${icon(c.icon)}</div><h2>${c[l]}</h2></div>
<div class="grid g3">${items.map(([s]) => `<a class="card rv" href="${P.service(l, s)}"><h3>${esc(d.services[s].name)}</h3><p>${esc(d.services[s].sum)}</p><span class="more">${u.quote.split(" ")[0] === "Get" ? "Details" : "Detalles"} ${icon("arrow")}</span></a>`).join("")}</div></div>`;
  }).join("");
  const body = `<section class="hero small"><div class="wrap"><span class="eyebrow">${ORDER.length} ${u.stats[0]}</span><h1>${u.servicesTitle}</h1><p class="lead">${u.servicesSub}</p>${ctaBtns(l)}</div></section>
<section><div class="wrap">${sections}</div></section>${ctaBand(l)}`;
  return page(l, "services", twin, body, u.title.services, u.desc);
}

function servicePage(l, slug) {
  const u = L[l].ui, s = L[l].services[slug];
  const cat = ORDER.find(([x]) => x === slug)[1];
  const twin = { en: P.service("en", slug), es: P.service("es", slug) };
  const related = ORDER.filter(([x, c]) => c === cat && x !== slug).concat(ORDER.filter(([x, c]) => c !== cat && x !== slug)).slice(0, 3)
    .map(([x]) => `<a class="card rv" href="${P.service(l, x)}"><h3>${esc(L[l].services[x].name)}</h3><p>${esc(L[l].services[x].sum)}</p><span class="more">${icon("arrow")}</span></a>`).join("");
  const jsonld = { "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.sum, provider: { "@type": "AutoRepair", name: brand(l), telephone: C.phoneHref }, areaServed: C.areas.map((a) => ({ "@type": "City", name: a })) };
  const body = `<section class="hero small"><div class="wrap"><p class="crumbs"><a href="${P.home(l)}">${u.nav.home}</a> / <a href="${P.services(l)}">${u.nav.services}</a></p>
<div class="hero-icon">${icon(catIcon(cat))}</div><h1>${esc(s.name)}</h1><p class="lead">${esc(s.sum)}</p>${ctaBtns(l)}</div></section>
<section><div class="wrap cols"><div>
<div class="card rv"><h2>${u.symptoms}</h2><ul class="ticks signs">${s.symptoms.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
<div class="card rv" style="margin-top:20px"><h2>${u.includes}</h2><ul class="ticks">${s.includes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
<div class="card rv" style="margin-top:20px"><h2>${u.howMobile}</h2><p>${u.howMobileText}</p></div>
<div class="section-head" style="margin-top:44px"><h2>${u.faq}</h2></div>${faqHtml(s.faq)}</div>
<aside class="card sticky-card rv"><div class="ibox">${icon("phone")}</div><h3>${u.formTitle}</h3><p>${u.formSub}</p>
<div class="btns"><a class="btn btn-primary" href="${tel}">${icon("phone")} ${C.phone}</a><a class="btn btn-outline" href="${P.contact(l)}?s=${encodeURIComponent(s.name)}">${u.quote}</a></div></aside></div></section>
<section style="background:var(--surface)"><div class="wrap"><div class="section-head rv"><h2>${u.related}</h2></div><div class="grid g3">${related}</div>
<div class="btns"><a class="btn btn-outline" href="${P.services(l)}">${u.back}</a></div></div></section>${ctaBand(l)}`;
  return page(l, "services", twin, body, `${s.name} | ${brand(l)} Austin, TX`, s.sum + " " + C.areas.join(", ") + ".", jsonld);
}

function about(l) {
  const u = L[l].ui;
  const twin = { en: P.about("en"), es: P.about("es") };
  const body = `<section class="hero small"><div class="wrap"><span class="eyebrow">${esc(brand(l))}</span><h1>${u.aboutTitle}</h1></div></section>
<section><div class="wrap cols"><div class="rv">${u.aboutP.map((p) => `<p style="font-size:1.15rem">${p}</p>`).join("")}${C.founded ? `<p><strong>${C.founded}</strong></p>` : ""}
<h2 style="margin-top:1.5em">${u.aboutTeam}</h2><p class="note">${u.aboutTeamNote}</p></div>
<div class="card sticky-card rv"><h3>${u.whyTitle}</h3><ul class="ticks">${u.why.map(([t]) => `<li>${t}</li>`).join("")}</ul></div></div></section>${ctaBand(l)}`;
  return page(l, "about", twin, body, u.title.about, u.desc);
}

function contact(l) {
  const u = L[l].ui;
  const twin = { en: P.contact("en"), es: P.contact("es") };
  const body = `<section class="hero small"><div class="wrap"><span class="eyebrow">${u.schedule}</span><h1>${u.formTitle}</h1><p class="lead">${u.formSub}</p></div></section>
<section><div class="wrap cols"><div class="card rv">${quoteForm(l)}</div>
<div><div class="card rv"><h3>${u.contactTitle}</h3><p style="display:grid;gap:10px;margin-top:12px">${contactLines(l)}</p></div>
<div class="card rv" style="margin-top:20px"><h3>${icon("clock")} ${u.hoursTitle}</h3>${hoursTable(l)}</div></div></div></section>`;
  return page(l, "contact", twin, body, u.title.contact, u.desc);
}

// ---------- generar ----------
fs.rmSync(path.join(ROOT, "en"), { recursive: true, force: true });
fs.rmSync(path.join(ROOT, "es"), { recursive: true, force: true });
const urls = [];
for (const l of ["en", "es"]) {
  write(l, home(l)); urls.push(P.home(l));
  write(P.services(l).slice(1), servicesHub(l)); urls.push(P.services(l));
  for (const [slug] of ORDER) { write(P.service(l, slug).slice(1), servicePage(l, slug)); urls.push(P.service(l, slug)); }
  write(P.about(l).slice(1), about(l)); urls.push(P.about(l));
  write(P.contact(l).slice(1), contact(l)); urls.push(P.contact(l));
}
fs.writeFileSync(path.join(ROOT, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${C.brand} | ${C.brandEs}</title>
<link rel="alternate" hreflang="en" href="/en/"><link rel="alternate" hreflang="es" href="/es/">
<script>var l;try{l=localStorage.getItem("lang")}catch(e){}if(l!=="en"&&l!=="es"){l=(navigator.language||"en").toLowerCase().indexOf("es")===0?"es":"en"}location.replace("/"+l+"/")</script>
<noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript></head>
<body><p><a href="/en/">English</a> · <a href="/es/">Español</a></p></body></html>`);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${C.siteUrl}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${C.siteUrl}/sitemap.xml\n`);
console.log(`OK: ${urls.length} páginas generadas`);
