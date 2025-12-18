/* =====================================================
   GALLERY LIGHTBOX
   ===================================================== */

const galleryImages = document.querySelectorAll('.gallery-grid img');

if (galleryImages.length) {

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'none';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '999';

  const img = document.createElement('img');
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.borderRadius = '8px';

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  galleryImages.forEach(image => {
    image.addEventListener('click', () => {
      img.src = image.src;
      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

}
