/* =====================================================
   RSVP FORM
   ===================================================== */

const rsvpForm = document.querySelector('.rsvp-form');
const successMsg = document.querySelector('.rsvp-success');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Aquí luego puedes enviar fetch a backend
    rsvpForm.classList.add('hidden');
    successMsg.classList.remove('hidden');
  });
}
