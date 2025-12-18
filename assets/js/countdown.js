/* =====================================================
   COUNTDOWN
   ===================================================== */

const countdownEl = document.getElementById('countdownTimer');

// Cambia esta fecha cuando uses la plantilla
const weddingDate = new Date('2026-04-20T17:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdownEl.innerHTML = '<p>¡Hoy es el gran día!</p>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEl.innerHTML = `
    <div>
      <strong>${days}</strong>
      <span>Días</span>
    </div>
    <div>
      <strong>${hours}</strong>
      <span>Horas</span>
    </div>
    <div>
      <strong>${minutes}</strong>
      <span>Min</span>
    </div>
    <div>
      <strong>${seconds}</strong>
      <span>Seg</span>
    </div>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();
