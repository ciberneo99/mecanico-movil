// ============================================================
//  EDITA AQUÍ / EDIT HERE — datos del negocio.
//  Después ejecuta:  node tools/build.js
// ============================================================
module.exports = {
  brand: "Austin Mobile Mechanic",
  brandEs: "Mecánico Móvil Austin",
  phone: "210 865 2278",             // REAL (de la página actual)
  phoneHref: "+12108652278",
  whatsapp: "",                       // TODO: ej. "12108652278" (solo números con código de país)
  email: "westend@mailservice.com",   // TODO: placeholder de la página anterior
  address: "",                        // TODO: la dirección anterior era falsa; vacío si es 100% móvil
  siteUrl: "https://mecanicomobil.netlify.app",     // TODO: cambiar al dominio final
  areas: ["Austin", "Round Rock", "Pflugerville", "Cedar Park"],
  founded: "",                        // TODO: el sitio anterior dice "desde 1975" y "más de 20 años"
  hours: {
    en: [["Monday", "8:00 am – 9:00 pm"], ["Tuesday – Friday", "8:00 am – 5:00 pm"], ["Saturday – Sunday", "Open 24 hours"]],
    es: [["Lunes", "8:00 am – 9:00 pm"], ["Martes – Viernes", "8:00 am – 5:00 pm"], ["Sábado – Domingo", "Abierto 24 horas"]],
  },
};
