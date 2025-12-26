/* =====================================================
   GALLERY LIGHTBOX + CAROUSEL
   ===================================================== */

function initGallery() {

  const galleryImages = document.querySelectorAll('.gallery-grid img');

  if (!galleryImages.length) return;

  let currentIndex = 0;

  /* =========================
     OVERLAY
     ========================= */
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  overlay.style.transition = 'opacity .3s ease';
  overlay.style.zIndex = '9999';

  /* =========================
     IMAGEN
     ========================= */
  const img = document.createElement('img');
  img.style.maxWidth = '90%';
  img.style.maxHeight = '85vh';
  img.style.borderRadius = '12px';
  img.style.boxShadow = '0 20px 60px rgba(0,0,0,.4)';

  /* =========================
     BOTONES
     ========================= */
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '24px';
  closeBtn.style.fontSize = '2rem';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';

  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '‹';
  prevBtn.style.position = 'absolute';
  prevBtn.style.left = '20px';
  prevBtn.style.top = '50%';
  prevBtn.style.transform = 'translateY(-50%)';
  prevBtn.style.fontSize = '3rem';
  prevBtn.style.background = 'none';
  prevBtn.style.border = 'none';
  prevBtn.style.color = '#fff';
  prevBtn.style.cursor = 'pointer';

  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '›';
  nextBtn.style.position = 'absolute';
  nextBtn.style.right = '20px';
  nextBtn.style.top = '50%';
  nextBtn.style.transform = 'translateY(-50%)';
  nextBtn.style.fontSize = '3rem';
  nextBtn.style.background = 'none';
  nextBtn.style.border = 'none';
  nextBtn.style.color = '#fff';
  nextBtn.style.cursor = 'pointer';

  /* =========================
     DOM
     ========================= */
  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(img);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  /* =========================
     FUNCIONES
     ========================= */
  function openGallery(index) {
    currentIndex = index;
    img.src = galleryImages[currentIndex].src;
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
  }

  function closeGallery() {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }

  function showPrev() {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    img.src = galleryImages[currentIndex].src;
  }

  function showNext() {
    currentIndex =
      (currentIndex + 1) % galleryImages.length;
    img.src = galleryImages[currentIndex].src;
  }

  /* =========================
     EVENTOS
     ========================= */
  galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => openGallery(index));
  });

  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeGallery();
  });

  document.addEventListener('keydown', e => {
    if (overlay.style.pointerEvents === 'none') return;

    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
