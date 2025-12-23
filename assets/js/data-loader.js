document.addEventListener("DOMContentLoaded", () => {

  fetch("assets/data/invitation.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar invitation.json");
      return res.json();
    })
    .then(data => {

      /* =====================================================
         HERO
         ===================================================== */

      const heroPretitle = document.getElementById("heroPretitle");
      const heroNames = document.getElementById("heroNames");
      const heroBg = document.querySelector(".hero-bg");

      if (heroPretitle) heroPretitle.innerHTML = data.hero.pretitle;
      if (heroNames) heroNames.innerHTML = data.hero.names;
      if (heroBg) heroBg.style.backgroundImage = `url(${data.hero.background})`;

      /* =====================================================
         LOCATION / LUGAR
         ===================================================== */

      const locationTitle = document.getElementById("locationTitle");
      const locationSubtitle = document.getElementById("locationSubtitle");
      const locationDate = document.getElementById("locationDate");
      const locationGrid = document.getElementById("locationGrid");

      if (locationTitle) locationTitle.innerHTML = data.location.title;
      if (locationSubtitle) locationSubtitle.innerHTML = data.location.subtitle;
      if (locationDate) locationDate.innerHTML = data.location.dateText;

      if (locationGrid) {
        locationGrid.innerHTML = "";

        data.location.places.forEach(place => {
          locationGrid.innerHTML += `
            <div class="location-card reveal-zoom">
              <h3 class="location-card-title">${place.title}</h3>
              <p class="location-time">${place.time}</p>
              <img src="${place.image}" alt="">
              <p class="location-place">${place.place}</p>
              <p class="location-address">${place.address}</p>
              <a href="${place.map}" class="btn btn-primary" target="_blank" rel="noopener">
                Ver mapa
              </a>
            </div>
          `;
        });
      }

      /* =====================================================
         TIMELINE / PROGRAMA
         ===================================================== */

      const timelineContainer = document.getElementById("timelineContainer");

      if (timelineContainer) {
        timelineContainer.innerHTML = `<div class="timeline-line"></div>`;

        data.timeline.forEach((item, i) => {
          timelineContainer.innerHTML += `
            <div class="timeline-row ${i % 2 ? "is-flip" : ""}">
              <div class="timeline-side timeline-side--left">
                ${
                  i % 2 === 0
                    ? `<img class="timeline-icon" src="${item.icon}" alt="">`
                    : `<div class="timeline-text">
                         <span class="time">${item.time}</span>
                         ${item.text}
                       </div>`
                }
              </div>

              <div class="timeline-center">
                <span class="timeline-point"></span>
              </div>

              <div class="timeline-side timeline-side--right">
                ${
                  i % 2
                    ? `<img class="timeline-icon" src="${item.icon}" alt="">`
                    : `<div class="timeline-text">
                         <span class="time">${item.time}</span>
                         ${item.text}
                       </div>`
                }
              </div>
            </div>
          `;
        });
      }

      /* =====================================================
         GIFTS / REGALOS
         ===================================================== */

      const giftsText = document.getElementById("giftsText");
      const giftsOptions = document.getElementById("giftsOptions");

      if (giftsText) giftsText.innerHTML = data.gifts.text;

      if (giftsOptions) {
        giftsOptions.innerHTML = "";

        data.gifts.items.forEach(gift => {
          giftsOptions.innerHTML += `
            <div class="gift-item reveal-zoom">
              <img src="${gift.icon}" class="gift-icon" alt="">
              <h4 class="gift-title">${gift.title}</h4>
              <p class="gift-desc">${gift.desc}</p>
            </div>
          `;
        });
      }

      /* =====================================================
         DRESSCODE / VESTIMENTA
         ===================================================== */

      const dresscodeType = document.getElementById("dresscodeType");
      const dresscodeImage = document.getElementById("dresscodeImage");
      const dresscodeNote = document.getElementById("dresscodeNote");
      const menList = document.getElementById("dresscodeMen");
      const womenList = document.getElementById("dresscodeWomen");

      if (dresscodeType) dresscodeType.innerHTML = data.dresscode.type;
      if (dresscodeImage) dresscodeImage.src = data.dresscode.image;
      if (dresscodeNote) dresscodeNote.innerHTML = data.dresscode.note;

      if (menList) {
        menList.innerHTML = "";
        data.dresscode.men.forEach(item => menList.innerHTML += `<li>${item}</li>`);
      }

      if (womenList) {
        womenList.innerHTML = "";
        data.dresscode.women.forEach(item => womenList.innerHTML += `<li>${item}</li>`);
      }

      /* =====================================================
         GALLERY
         ===================================================== */

      const galleryGrid = document.getElementById("galleryGrid");

      if (galleryGrid) {
        galleryGrid.innerHTML = "";
        data.gallery.forEach(img => {
          galleryGrid.innerHTML += `<img src="${img}" alt="">`;
        });
      }

      /* =====================================================
         RSVP
         ===================================================== */

      const rsvpIntro = document.getElementById("rsvpIntro");
      const rsvpNote = document.getElementById("rsvpNote");
      const rsvpSuccess = document.getElementById("rsvpSuccess");

      if (rsvpIntro) rsvpIntro.innerHTML = data.rsvp.intro;
      if (rsvpNote) rsvpNote.innerHTML = data.rsvp.note;
      if (rsvpSuccess) rsvpSuccess.innerHTML = data.rsvp.success;

      /* =====================================================
         INICIALIZACIONES FINALES
         ===================================================== */

      if (window.initTimeline) window.initTimeline();
      if (window.initFlowerObserver) window.initFlowerObserver();
      if (window.initFlowerParallax) window.initFlowerParallax();

    })
    .catch(err => {
      console.error("Error cargando invitation.json:", err);
    });

});
