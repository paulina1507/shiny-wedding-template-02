/* =====================================================
   MAIN JS – SHINY MAKER EVENTS (FINAL)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     INTRO – SOBRE GLOBAL
     ===================================================== */

  const overlay = document.getElementById("envelopeOverlay");
  const envelope = overlay?.querySelector(".envelope");
  const seal = document.getElementById("sealButton");

  if (overlay && envelope && seal) {
    // Bloquear scroll mientras el sobre está activo
    document.body.style.overflow = "hidden";

    seal.addEventListener("click", () => {
      // 1. Detener latido del sello
      seal.style.animation = "none";
      seal.style.opacity = "0";

      // 2. Abrir sobre
      envelope.classList.add("open");

      // 3. Animación de salida del sobre
      setTimeout(() => {
        envelope.classList.add("drop-exit");
      }, 400);

      // 4. Fade out del overlay y activar contenido
      setTimeout(() => {
        overlay.classList.add("fade-out");
        document.body.style.overflow = "auto";
        document.body.classList.add("content-ready");

        revealContent();
        initFlowerObserver();
        initFlowerParallax(); // 🌸 ACTIVAMOS PARALLAX
      }, 1400);
    });
  } else {
    // Fallback si no hay sobre
    document.body.classList.add("content-ready");
    revealContent();
    initFlowerObserver();
    initFlowerParallax(); // 🌸 ACTIVAMOS PARALLAX
  }

  /* =====================================================
     REVEAL DE CONTENIDO
     ===================================================== */

  function revealContent() {
    const reveals = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    reveals.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, i * 120);
    });
  }

  /* =====================================================
     FLORES – ENTRADA POR SCROLL (VISIBILIDAD)
     ===================================================== */

  function initFlowerObserver() {
    const flowerSections = document.querySelectorAll(".section--flowers");

    if (!flowerSections.length) return;

    const flowerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("flowers-visible");
            flowerObserver.unobserve(entry.target); // solo una vez
          }
        });
      },
      { threshold: 0.25 }
    );

    flowerSections.forEach((section) => {
      flowerObserver.observe(section);
    });
  }

  /* =====================================================
     FLORES – MOVIMIENTO SEGÚN SCROLL (PARALLAX REAL)
     ===================================================== */

  function initFlowerParallax() {
    const sections = document.querySelectorAll(".section--flowers");
    if (!sections.length) return;

    let ticking = false;

    function update() {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;

        // Si la sección no está visible, no mover nada
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        // Progreso del scroll dentro de la sección (0 → 1)
        const progress =
          (viewportHeight - rect.top) / (viewportHeight + sectionHeight);

        const clamped = Math.max(0, Math.min(progress, 1));
        const flowers = section.querySelectorAll(".flower");

        flowers.forEach((flower) => {
          const maxMove = 60; // límite en px
          const direction = flower.classList.contains("flower--top") ? 1 : -1;

          const translateY = clamped * maxMove * direction;

          flower.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
      });

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    });
  }

  /* =====================================================
     TIMELINE – LINE + ITEMS
     ===================================================== */

  const timeline = document.getElementById("timelineContainer");
  const line = timeline?.querySelector(".timeline-line");
  const rows = document.querySelectorAll(".timeline-row");

  if (timeline && line && rows.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => {
                row.classList.add("is-visible");
              }, i * 160);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(timeline);

    window.addEventListener("scroll", () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.7;
      let progress = (start - rect.top) / rect.height;

      progress = Math.max(0, Math.min(progress, 1));

      line.style.transform = `translateX(-50%) scaleY(${progress})`;
    });
  }
});
