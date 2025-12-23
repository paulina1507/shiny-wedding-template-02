/* =====================================================
   MAIN JS – SHINY MAKER EVENTS (FINAL & STABLE)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     INTRO – SOBRE GLOBAL
     ===================================================== */

  const overlay = document.getElementById("envelopeOverlay");
  const envelope = overlay?.querySelector(".envelope");
  const seal = document.getElementById("sealButton");

  if (overlay && envelope && seal) {
    document.body.style.overflow = "hidden";

    seal.addEventListener("click", () => {
      seal.style.animation = "none";
      seal.style.opacity = "0";

      envelope.classList.add("open");

      setTimeout(() => {
        envelope.classList.add("drop-exit");
      }, 400);

      setTimeout(() => {
        overlay.classList.add("fade-out");
        document.body.style.overflow = "auto";
        document.body.classList.add("content-ready");

        revealContent();
        initFlowerObserver();
        initFlowerParallax();
      }, 1400);
    });

  } else {
    document.body.classList.add("content-ready");
    revealContent();
    initFlowerObserver();
    initFlowerParallax();
  }

  /* =====================================================
     REVEAL DE CONTENIDO
     ===================================================== */

  function revealContent() {
    const reveals = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    );

    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 120);
    });
  }

  /* =====================================================
     FLORES – VISIBILIDAD POR SCROLL
     ===================================================== */

  function initFlowerObserver() {
    const sections = document.querySelectorAll(".section--flowers");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("flowers-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* =====================================================
     FLORES – PARALLAX
     ===================================================== */

  function initFlowerParallax() {
    const sections = document.querySelectorAll(".section--flowers");
    if (!sections.length) return;

    let ticking = false;

    function update() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < 0 || rect.top > vh) return;

        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.max(0, Math.min(progress, 1));

        section.querySelectorAll(".flower").forEach(flower => {
          const max = 60;
          const dir = flower.classList.contains("flower--top") ? 1 : -1;
          flower.style.transform = `translate3d(0, ${clamped * max * dir}px, 0)`;
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
     TIMELINE – SE INICIALIZA DESDE AFUERA
     ===================================================== */

  window.initTimeline = function () {
    const timeline = document.getElementById("timelineContainer");
    if (!timeline) return;

    const line = timeline.querySelector(".timeline-line");
    const rows = timeline.querySelectorAll(".timeline-row");
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => row.classList.add("is-visible"), i * 160);
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
      const start = window.innerHeight * 0.7;

      let progress = (start - rect.top) / rect.height;
      progress = Math.max(0, Math.min(progress, 1));

      if (line) {
        line.style.transform = `translateX(-50%) scaleY(${progress})`;
      }
    });
  };

});
