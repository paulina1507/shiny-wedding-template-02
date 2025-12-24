document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/invitation.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar invitation.json");
      return res.json();
    })
    .then((data) => {
      /* =====================================================
         META / SITE
         ===================================================== */

      if (data.meta?.pageTitle) {
        document.title = data.meta.pageTitle;
      }

      const headerLogo = document.getElementById("headerLogo");
      if (headerLogo && data.site?.couple) {
        headerLogo.innerHTML = data.site.couple;
      }

      /* =====================================================
         NAV
         ===================================================== */

      const navLeft = document.getElementById("navLeft");
      const navRight = document.getElementById("navRight");

      if (navLeft && data.nav?.left) {
        navLeft.innerHTML = "";
        data.nav.left.forEach((link) => {
          navLeft.innerHTML += `<a href="${link.href}">${link.label}</a>`;
        });
      }

      if (navRight && data.nav?.right) {
        navRight.innerHTML = "";
        data.nav.right.forEach((link) => {
          navRight.innerHTML += `<a href="${link.href}">${link.label}</a>`;
        });
      }

      /* =====================================================
         HERO
         ===================================================== */

      const heroPretitle = document.getElementById("heroPretitle");
      const heroNames = document.getElementById("heroNames");
      const heroBg = document.querySelector(".hero-bg");

      if (heroPretitle) heroPretitle.innerHTML = data.hero?.pretitle || "";
      if (heroNames) heroNames.innerHTML = data.hero?.names || "";
      if (heroBg && data.hero?.background) {
        heroBg.style.backgroundImage = `url(${data.hero.background})`;
      }

      /* =====================================================
         PRESENTACIÓN
         ===================================================== */

      const presentationTitle = document.getElementById("presentationTitle");
      const presentationParents = document.getElementById(
        "presentationParents"
      );
      const presentationText = document.getElementById("presentationText");
      const presentationIcon = document.getElementById("presentationIcon");

      if (presentationTitle) {
        presentationTitle.innerHTML = data.presentation?.title || "";
      }

      if (presentationParents && data.presentation?.parents) {
        presentationParents.innerHTML = "";
        data.presentation.parents.forEach((group) => {
          presentationParents.innerHTML += `
            <p class="parents-names">${group.names.join("<br>")}</p>
            <p class="parents-note">(${group.note})</p>
          `;
        });
      }

      if (presentationText) {
        presentationText.innerHTML = data.presentation?.text || "";
      }

      if (presentationIcon && data.presentation?.icon) {
        presentationIcon.src = data.presentation.icon;
      }

      /* =====================================================
         LOCATION
         ===================================================== */

      const locationTitle = document.getElementById("locationTitle");
      const locationSubtitle = document.getElementById("locationSubtitle");
      const locationDate = document.getElementById("locationDate");
      const locationGrid = document.getElementById("locationGrid");

      if (locationTitle) locationTitle.innerHTML = data.location?.title || "";
      if (locationSubtitle)
        locationSubtitle.innerHTML = data.location?.subtitle || "";
      if (locationDate) locationDate.innerHTML = data.location?.dateText || "";

      if (locationGrid && data.location?.places) {
        locationGrid.innerHTML = "";
        data.location.places.forEach((place) => {
          locationGrid.innerHTML += `
            <div class="location-card reveal-zoom">
              <h3 class="location-card-title">${place.title}</h3>
              <p class="location-time">${place.time}</p>
              <img src="${place.image}">
              <p class="location-place">${place.place}</p>
              <p class="location-address">${place.address}</p>
              <a href="${place.map}" class="btn btn-primary" target="_blank">Ver mapa</a>
            </div>
          `;
        });
      }

      /* =====================================================
         TIMELINE
         ===================================================== */

      const timelineTitle = document.getElementById("timelineTitle");
      const timelineContainer = document.getElementById("timelineContainer");

      if (timelineTitle) timelineTitle.innerHTML = data.timeline?.title || "";

      if (timelineContainer && data.timeline?.items) {
        timelineContainer.innerHTML = `<div class="timeline-line"></div>`;
        data.timeline.items.forEach((item, i) => {
          timelineContainer.innerHTML += `
            <div class="timeline-row ${i % 2 ? "is-flip" : ""}">
              <div class="timeline-side timeline-side--left">
                ${
                  i % 2 === 0
                    ? `<img class="timeline-icon" src="${item.icon}">`
                    : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
                }
              </div>
              <div class="timeline-center"><span class="timeline-point"></span></div>
              <div class="timeline-side timeline-side--right">
                ${
                  i % 2
                    ? `<img class="timeline-icon" src="${item.icon}">`
                    : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
                }
              </div>
            </div>
          `;
        });
      }

      /* =====================================================
         GIFTS
         ===================================================== */

      const giftsTitle = document.getElementById("giftsTitle");
      const giftsText = document.getElementById("giftsText");
      const giftsOptions = document.getElementById("giftsOptions");

      if (giftsTitle) giftsTitle.innerHTML = data.gifts?.title || "";
      if (giftsText) giftsText.innerHTML = data.gifts?.text || "";

      if (giftsOptions && data.gifts?.items) {
        giftsOptions.innerHTML = "";
        data.gifts.items.forEach((gift) => {
          giftsOptions.innerHTML += `
            <div class="gift-item reveal-zoom">
              <img src="${gift.icon}" class="gift-icon">
              <h4 class="gift-title">${gift.title}</h4>
              <p class="gift-desc">${gift.desc}</p>
            </div>
          `;
        });
      }

      /* =====================================================
         DRESSCODE
         ===================================================== */

      const dresscodeTitle = document.getElementById("dresscodeTitle");
      const dresscodeType = document.getElementById("dresscodeType");
      const dresscodeImage = document.getElementById("dresscodeImage");
      const dresscodeNote = document.getElementById("dresscodeNote");
      const menTitle = document.getElementById("dresscodeMenTitle");
      const womenTitle = document.getElementById("dresscodeWomenTitle");
      const menList = document.getElementById("dresscodeMen");
      const womenList = document.getElementById("dresscodeWomen");

      if (dresscodeTitle)
        dresscodeTitle.innerHTML = data.dresscode?.title || "";
      if (dresscodeType) dresscodeType.innerHTML = data.dresscode?.type || "";
      if (dresscodeImage) dresscodeImage.src = data.dresscode?.image || "";
      if (dresscodeNote) dresscodeNote.innerHTML = data.dresscode?.note || "";
      if (menTitle) menTitle.innerHTML = data.dresscode?.menTitle || "";
      if (womenTitle) womenTitle.innerHTML = data.dresscode?.womenTitle || "";

      if (menList) {
        menList.innerHTML = "";
        data.dresscode?.men?.forEach(
          (i) => (menList.innerHTML += `<li>${i}</li>`)
        );
      }

      if (womenList) {
        womenList.innerHTML = "";
        data.dresscode?.women?.forEach(
          (i) => (womenList.innerHTML += `<li>${i}</li>`)
        );
      }

      /* =====================================================
         GALLERY
         ===================================================== */

      const galleryTitle = document.getElementById("galleryTitle");
      const galleryGrid = document.getElementById("galleryGrid");

      if (galleryTitle) galleryTitle.innerHTML = data.gallery?.title || "";
      if (galleryGrid && data.gallery?.images) {
        galleryGrid.innerHTML = "";
        data.gallery.images.forEach((img) => {
          galleryGrid.innerHTML += `<img src="${img}">`;
        });
      }
      /* =====================================================
   RSVP (CONFIRMACIÓN + DATOS ASIGNADOS)
   ===================================================== */

      const rsvpTitle = document.getElementById("rsvpTitle");
      const rsvpIntro = document.getElementById("rsvpIntro");
      const rsvpNote = document.getElementById("rsvpNote");
      const rsvpSuccess = document.getElementById("rsvpSuccess");

      const rsvpName = document.getElementById("rsvpName");
      const rsvpAttendance = document.getElementById("rsvpAttendance");
      const rsvpMessage = document.getElementById("rsvpMessage");
      const rsvpButton = document.getElementById("rsvpButton");

      /* Textos asignados */
      const rsvpExtra = document.getElementById("rsvpExtra");
      const rsvpPassesText = document.getElementById("rsvpPassesText");
      const rsvpTableText = document.getElementById("rsvpTableText");

      /* Texto base */
      if (rsvpTitle) rsvpTitle.innerHTML = data.rsvp?.title || "";
      if (rsvpIntro) rsvpIntro.innerHTML = data.rsvp?.intro || "";
      if (rsvpNote) rsvpNote.innerHTML = data.rsvp?.note || "";

      if (rsvpName)
        rsvpName.placeholder = data.rsvp?.fields?.namePlaceholder || "";

      if (rsvpMessage)
        rsvpMessage.placeholder = data.rsvp?.fields?.messagePlaceholder || "";

      if (rsvpButton)
        rsvpButton.innerHTML = data.rsvp?.fields?.buttonText || "";

      /* Select asistencia */
      if (rsvpAttendance) {
        rsvpAttendance.innerHTML = `<option value="">${
          data.rsvp?.fields?.attendancePlaceholder || ""
        }</option>`;

        data.rsvp?.fields?.attendanceOptions?.forEach((opt) => {
          rsvpAttendance.innerHTML += `<option>${opt}</option>`;
        });
      }

      /* Envío */
      const rsvpForm = document.getElementById("rsvpForm");

      if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const asistencia = rsvpAttendance.value.toLowerCase();

          if (asistencia.includes("sí")) {
            if (rsvpPassesText)
              rsvpPassesText.textContent =
                data.rsvp?.fields?.assignedPasses || "-";

            if (rsvpTableText)
              rsvpTableText.textContent =
                data.rsvp?.fields?.assignedTable || "-";

            rsvpExtra.classList.remove("hidden");
          }

          rsvpSuccess.innerHTML = `
      ${data.rsvp?.success || ""}
    `;

          rsvpSuccess.classList.remove("hidden");
          rsvpForm.classList.add("hidden");
        });
      }

      /* =====================================================
         🎵 MUSIC PLAYER
         ===================================================== */

      const music = document.getElementById("bgMusic");
      const toggle = document.getElementById("musicToggle");
      const icon = document.getElementById("musicIcon");
      const seal = document.getElementById("sealButton");

      if (music && toggle && icon && seal && data.music?.src) {
        music.src = data.music.src;
        music.volume = 0;

        const TARGET_VOLUME = data.music.volume ?? 0.6;
        const STEP = 0.02;
        let fadeInterval = null;
        let isPlaying = false;

        const fadeIn = () => {
          clearInterval(fadeInterval);
          fadeInterval = setInterval(() => {
            if (music.volume < TARGET_VOLUME) {
              music.volume = Math.min(TARGET_VOLUME, music.volume + STEP);
            } else {
              clearInterval(fadeInterval);
            }
          }, 60);
        };

        const playMusic = () => {
          music
            .play()
            .then(() => {
              isPlaying = true;
              icon.src = "assets/img/pause.svg";
              toggle.classList.add("playing");
              fadeIn();
            })
            .catch(() => {});
        };

        const pauseMusic = () => {
          music.pause();
          isPlaying = false;
          icon.src = "assets/img/play.svg";
          toggle.classList.remove("playing");
        };

        seal.addEventListener("click", () => {
          if (!isPlaying) playMusic();
        });

        toggle.addEventListener("click", () => {
          isPlaying ? pauseMusic() : playMusic();
        });
      }

      /* =====================================================
         FOOTER
         ===================================================== */

      const footerNames = document.getElementById("footerNames");
      const footerCredits = document.getElementById("footerCredits");

      if (footerNames) footerNames.innerHTML = data.footer?.names || "";
      if (footerCredits) footerCredits.innerHTML = data.footer?.credits || "";

      /* =====================================================
         INIT
         ===================================================== */

      if (window.initTimeline) window.initTimeline();
      if (window.initFlowerObserver) window.initFlowerObserver();
      if (window.initFlowerParallax) window.initFlowerParallax();
    })
    .catch((err) => console.error("Error cargando invitation.json:", err));
});
