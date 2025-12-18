/* =====================================================
   TIMELINE – LINE + ITEMS (ELEGANTE)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const timeline = document.querySelector('.timeline-vertical');
  const line = document.querySelector('.timeline-line');
  const rows = document.querySelectorAll('.timeline-row');

  if (!timeline || !line || !rows.length) return;

  /* ---- 1. Revelar items una sola vez ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        rows.forEach((row, i) => {
          setTimeout(() => {
            row.classList.add('is-visible');
          }, i * 160);
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(timeline);

  /* ---- 2. Línea progresiva por scroll ---- */
  window.addEventListener('scroll', () => {

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.7;
    let progress = (start - rect.top) / rect.height;

    progress = Math.max(0, Math.min(progress, 1));

    line.style.transform =
      `translateX(-50%) scaleY(${progress})`;

  });

});
