// Categorías y orden de servicios (slug -> categoría). Los textos están en en.js / es.js
// icon = nombre de ícono definido en build.js (ICONS)
const CATEGORIES = [
  { id: "diagnostics", icon: "search", en: "Diagnostics & Maintenance", es: "Diagnóstico y mantenimiento" },
  { id: "engine", icon: "gear", en: "Engine & Cooling", es: "Motor y enfriamiento" },
  { id: "electrical", icon: "bolt", en: "Electrical & Starting", es: "Sistema eléctrico y arranque" },
  { id: "fuel", icon: "fuel", en: "Fuel System", es: "Sistema de combustible" },
  { id: "chassis", icon: "wheel", en: "Brakes, Suspension & Tires", es: "Frenos, suspensión y llantas" },
  { id: "body", icon: "paint", en: "Body & Paint", es: "Carrocería y pintura" },
  { id: "extras", icon: "snow", en: "More Services", es: "Más servicios" },
];

const ORDER = [
  ["check-engine-light", "diagnostics"],
  ["tune-up", "diagnostics"],
  ["pre-purchase-inspection", "diagnostics"],
  ["water-pump-replacement", "engine"],
  ["radiator-repair-replacement", "engine"],
  ["belt-timing-chain", "engine"],
  ["alternator", "electrical"],
  ["starter-replacement-repair", "electrical"],
  ["fuel-pump", "fuel"],
  ["brake-replacement", "chassis"],
  ["suspension-repair", "chassis"],
  ["shocks-and-struts-replacement", "chassis"],
  ["mobile-tire-repair", "chassis"],
  ["body-and-paint-repair", "body"],
  ["ac-repair", "extras"],
];

module.exports = { CATEGORIES, ORDER };
