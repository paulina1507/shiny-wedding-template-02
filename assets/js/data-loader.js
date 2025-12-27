document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/invitation.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar invitation.json");
      return res.json();
    })
    .then((data) => {
      /* =====================================================
         🎵 MUSIC DESDE JSON (NO BORRA NADA)
         ===================================================== */
      const musicEl = document.getElementById("bgMusic");
      if (musicEl && data.music?.src) {
        musicEl.src = data.music.src;
        musicEl.preload = "auto";
      }

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

      if (presentationTitle)
        presentationTitle.innerHTML = data.presentation?.title || "";

      if (presentationParents && data.presentation?.parents) {
        presentationParents.innerHTML = "";
        data.presentation.parents.forEach((group) => {
          presentationParents.innerHTML += `
            <p class="parents-names">${group.names.join("<br>")}</p>
            <p class="parents-note">(${group.note})</p>
          `;
        });
      }

      if (presentationText)
        presentationText.innerHTML = data.presentation?.text || "";

      if (presentationIcon && data.presentation?.icon)
        presentationIcon.src = data.presentation.icon;

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
        if (window.initGallery) {
          initGallery();
        }
      }

      /* =====================================================
   RSVP (FORM + TICKET + QR)
   ===================================================== */

      const rsvpTitle = document.getElementById("rsvpTitle");
      const rsvpIntro = document.getElementById("rsvpIntro");
      const rsvpNote = document.getElementById("rsvpNote");
      const rsvpSuccess = document.getElementById("rsvpSuccess");

      const rsvpForm = document.getElementById("rsvpForm");
      const rsvpName = document.getElementById("rsvpName");
      const rsvpAttendance = document.getElementById("rsvpAttendance");
      const rsvpMessage = document.getElementById("rsvpMessage");
      const rsvpButton = document.getElementById("rsvpButton");

      const rsvpExtra = document.getElementById("rsvpExtra");
      const rsvpGuestName = document.getElementById("rsvpGuestName");

      const rsvpPassesBlock = document.getElementById("rsvpPassesBlock");
      const rsvpPassesText = document.getElementById("rsvpPassesText");

      const rsvpTableBlock = document.getElementById("rsvpTableBlock");
      const rsvpTableText = document.getElementById("rsvpTableText");

      const rsvpQrCanvas = document.getElementById("rsvpQr");

      /* ================= HELPERS ================= */

      const hasFeature = (key) => data.features?.[key] === true;

      /* ================= TEXTOS RSVP ================= */

      if (rsvpTitle) rsvpTitle.innerHTML = data.rsvp?.title || "";
      if (rsvpIntro) rsvpIntro.innerHTML = data.rsvp?.intro || "";
      if (rsvpNote) rsvpNote.innerHTML = data.rsvp?.note || "";

      if (rsvpMessage)
        rsvpMessage.placeholder = data.rsvp?.fields?.messagePlaceholder || "";

      if (rsvpButton)
        rsvpButton.innerHTML = data.rsvp?.fields?.buttonText || "Confirmar";

      /* ================= INVITADO (PREFILL) ================= */

      if (rsvpName && data.invitado?.nombre) {
        rsvpName.value = data.invitado.nombre;
      }

      /* ================= ASISTENCIA ================= */

      if (rsvpAttendance) {
        rsvpAttendance.innerHTML = `
    <option value="">
      ${data.rsvp?.fields?.attendancePlaceholder || ""}
    </option>
  `;

        data.rsvp?.fields?.attendanceOptions?.forEach((opt) => {
          rsvpAttendance.innerHTML += `<option value="${opt}">${opt}</option>`;
        });
      }

      /* ================= SUBMIT RSVP ================= */

      if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const asistencia = rsvpAttendance.value.toLowerCase();
          const guestName = rsvpName?.value?.trim() || "";

          /* ===== LIMPIEZA GENERAL ===== */
          rsvpExtra?.classList.add("hidden");
          rsvpPassesBlock?.classList.add("hidden");
          rsvpTableBlock?.classList.add("hidden");
          rsvpQrCanvas?.closest(".ticket-qr")?.classList.add("hidden");

          rsvpIntro?.classList.remove("hidden");
          rsvpNote?.classList.remove("hidden");

          /* ===== SI ASISTE ===== */
          if (asistencia.includes("sí")) {
            if (rsvpGuestName) {
              rsvpGuestName.textContent = guestName;
            }

            /* Pases */
            if (hasFeature("pases") && data.invitado?.pases) {
              rsvpPassesText.textContent = data.invitado.pases;
              rsvpPassesBlock?.classList.remove("hidden");
            }

            /* Mesa */
            if (hasFeature("mesa") && data.invitado?.mesa?.numero) {
              rsvpTableText.textContent = data.invitado.mesa.numero;
              rsvpTableBlock?.classList.remove("hidden");
            }

            /* QR */
            if (hasFeature("qr") && window.QRious && rsvpQrCanvas) {
              const qrPayload = JSON.stringify({
                invitado_id: data.invitado?.id || null,
                nombre: guestName,
                pases: hasFeature("pases") ? data.invitado?.pases : null,
                mesa: hasFeature("mesa") ? data.invitado?.mesa?.numero : null,
              });

              new QRious({
                element: rsvpQrCanvas,
                value: qrPayload,
                size: 160,
                foreground: "#5b4b8a",
                background: "#ffffff",
              });

              rsvpQrCanvas.closest(".ticket-qr")?.classList.remove("hidden");
            }

            rsvpExtra?.classList.remove("hidden");
          }

          /* ===== NO ASISTE ===== */
          if (asistencia.includes("no")) {
            rsvpIntro?.classList.add("hidden");
            rsvpNote?.classList.add("hidden");
          }

          /* ===== MENSAJE FINAL ===== */
          if (rsvpSuccess) {
            if (asistencia.includes("sí") && data.rsvp?.success) {
              rsvpSuccess.innerHTML = `
          <strong>${data.rsvp.success.title}</strong><br>
          ${data.rsvp.success.text}
        `;
            }

            if (asistencia.includes("no") && data.rsvp?.decline) {
              rsvpSuccess.innerHTML = `
          <strong>${data.rsvp.decline.title}</strong><br>
          ${data.rsvp.decline.text}
        `;
            }

            rsvpSuccess.classList.remove("hidden");
          }

          /* ===== OCULTAR FORM ===== */
          rsvpForm.classList.add("hidden");

          /* Scroll suave SOLO si hay ticket */
          if (asistencia.includes("sí")) {
            rsvpExtra.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }

      /* =====================================================
         FOOTER
         ===================================================== */

      const footerNames = document.getElementById("footerNames");
      const footerCredits = document.getElementById("footerCredits");

      if (footerNames) footerNames.innerHTML = data.footer?.names || "";
      if (footerCredits) footerCredits.innerHTML = data.footer?.credits || "";
    })
    .catch((err) => console.error("Error cargando invitation.json:", err));
});
