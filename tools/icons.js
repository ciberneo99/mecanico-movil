// Íconos de línea (24x24) e ilustración del hero
const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/><circle cx="12" cy="12" r="6.5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M6 8h6M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  paint: '<rect x="4" y="3" width="13" height="6" rx="1.5"/><path d="M17 6h3v5h-9v4"/><rect x="9.5" y="15" width="3" height="6" rx="1"/>',
  snow: '<path d="M12 2v20M4.2 7l15.6 10M4.2 17 19.8 7M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  van: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
};
const icon = (n, cls = "") =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

// Camioneta de servicio móvil (ilustración vectorial)
const van = `<svg class="van" viewBox="0 0 520 300" role="img" aria-label="Mobile mechanic van" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="vb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cdd8ea"/></linearGradient>
<linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd0ff"/><stop offset="1" stop-color="#2a6fb5"/></linearGradient>
<linearGradient id="vo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#ff5a0a"/></linearGradient>
</defs>
<ellipse cx="260" cy="262" rx="215" ry="14" fill="#000" opacity=".28"/>
<path d="M40 238V108q0-18 18-18h250q20 0 34 15l62 64q14 14 14 34v35z" fill="url(#vb)"/>
<path d="M330 104h12q10 0 18 8l46 50q6 6 0 6H330z" fill="url(#vg)"/>
<path d="M40 190h400v14H40z" fill="url(#vo)"/>
<rect x="64" y="112" width="190" height="62" rx="8" fill="#0f2a4a"/>
<g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="translate(120 118) scale(2.2)"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" stroke-width="1.7" transform="scale(1)"/></g>
<rect x="276" y="112" width="3" height="78" fill="#a9b8d0"/>
<rect x="430" y="196" width="26" height="10" rx="4" fill="#ffd34d"/>
<path d="M452 238h22v-10h-20z" fill="#7d8aa3"/>
<g><circle cx="130" cy="240" r="34" fill="#111a2b"/><circle cx="130" cy="240" r="18" fill="#9fb0cc"/><circle cx="130" cy="240" r="7" fill="#111a2b"/></g>
<g><circle cx="388" cy="240" r="34" fill="#111a2b"/><circle cx="388" cy="240" r="18" fill="#9fb0cc"/><circle cx="388" cy="240" r="7" fill="#111a2b"/></g>
<rect x="30" y="256" width="460" height="3" rx="1.5" fill="#fff" opacity=".18"/>
</svg>`;

module.exports = { icon, van };
