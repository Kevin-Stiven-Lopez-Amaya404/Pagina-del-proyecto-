/* ============================================================
   script.js — Informe de Diseño de Software
   ============================================================ */

(function () {
  'use strict';

  /* ── ELEMENTOS ── */
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');
  const scrollBtn = document.getElementById('scrollTop');
  const menuToggle = document.querySelector('.menu-toggle');
  const submenu = document.querySelector('.submenu');

  /* ── TOGGLE MENÚ ── */
  function toggleMenu(force) {
    if (!sidebar || !overlay || !hamburger) return;

    const shouldOpen = force !== undefined
      ? force
      : !sidebar.classList.contains('open');

    sidebar.classList.toggle('open', shouldOpen);
    overlay.classList.toggle('visible', shouldOpen);
    hamburger.classList.toggle('open', shouldOpen);

    /* Accesibilidad */
    hamburger.setAttribute('aria-expanded', String(shouldOpen));
    sidebar.setAttribute('aria-hidden', String(!shouldOpen));
  }

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));
  }

  /* Cerrar al hacer clic en un enlace del menú */
  document.querySelectorAll('.nav-item[href]').forEach(function (link) {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* Cerrar con tecla Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* ── RESALTAR ENLACE ACTIVO AL HACER SCROLL ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-item[href]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const targetId = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === targetId
            );
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ── BOTÓN SCROLL TO TOP ── */
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── ANIMACIÓN DE ENTRADA DE SECCIONES ── */
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section').forEach(function (section) {
    /* Pausar la animación hasta que sea visible */
    section.style.animationPlayState = 'paused';
    fadeObserver.observe(section);
  });

  /* ── SUBMENU DE INFORME DE DISEÑO ── */
  if (menuToggle && submenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = submenu.classList.toggle('open');
      submenu.setAttribute('aria-hidden', String(!isOpen));
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

})();
