/* =========================================================
   NÍTIDO WEB — script.js
   Menú móvil + envío del formulario de contacto a WhatsApp
   ========================================================= */

// Número de WhatsApp del negocio (formato internacional, solo dígitos)
const WHATSAPP_NUMBER = "529861089963";

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initYear();
  initContactForm();
});

/* ---------- Menú móvil ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Año automático en el pie de página ---------- */
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Formulario de contacto -> WhatsApp ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const correo = form.correo.value.trim();
    const proyecto = form.proyecto.value;
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !telefono || !mensaje) {
      showStatus(status, "Falta completar nombre, teléfono o mensaje.", "error");
      return;
    }

    const partes = [
      "Hola, soy " + nombre + ".",
      "Me interesa: " + (proyecto || "una página web"),
      "Teléfono: " + telefono
    ];
    if (correo) partes.push("Correo: " + correo);
    partes.push("Mensaje: " + mensaje);

    const texto = encodeURIComponent(partes.join("\n"));
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + texto;

    showStatus(status, "Abriendo WhatsApp con tu mensaje listo para enviar…", "ok");
    window.open(url, "_blank", "noopener");
    form.reset();
  });
}

function showStatus(el, text, kind) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("ok", "error");
  el.classList.add(kind, "is-visible");
}
