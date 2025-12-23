fetch("assets/data/invitation.json")
  .then(res => res.json())
  .then(data => {

    /* ================= HERO ================= */
    document.getElementById("heroPretitle").innerHTML = data.hero.pretitle;
    document.getElementById("heroNames").innerHTML = data.hero.names;

    const heroBg = document.querySelector(".hero-bg");
    heroBg.style.backgroundImage = `url(${data.hero.background})`;

    /* ================= LOCATION ================= */
    document.getElementById("locationTitle").innerHTML = data.location.title;
    document.getElementById("locationSubtitle").innerHTML = data.location.subtitle;
    document.getElementById("locationDate").innerHTML = data.location.dateText;

    const locationGrid = document.getElementById("locationGrid");
    data.location.places.forEach(p => {
      locationGrid.innerHTML += `
        <div class="location-card">
          <h3 class="location-card-title">${p.title}</h3>
          <p class="location-time">${p.time}</p>
          <img src="${p.image}" alt="">
          <p class="location-place">${p.place}</p>
          <p class="location-address">${p.address}</p>
          <a href="${p.map}" class="btn btn-primary">Ver mapa</a>
        </div>
      `;
    });

    /* ================= TIMELINE ================= */
    const timeline = document.getElementById("timelineContainer");
    data.timeline.forEach((item, i) => {
      timeline.innerHTML += `
        <div class="timeline-row ${i % 2 ? "is-flip" : ""}">
          <div class="timeline-side timeline-side--left">
            ${i % 2 === 0 ? `<img class="timeline-icon" src="${item.icon}">` : `
              <div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`}
          </div>
          <div class="timeline-center"><span class="timeline-point"></span></div>
          <div class="timeline-side timeline-side--right">
            ${i % 2 ? `<img class="timeline-icon" src="${item.icon}">` : `
              <div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`}
          </div>
        </div>
      `;
    });

    /* ================= GIFTS ================= */
    document.getElementById("giftsText").innerHTML = data.gifts.text;
    const gifts = document.getElementById("giftsOptions");

    data.gifts.items.forEach(g => {
      gifts.innerHTML += `
        <div class="gift-item">
          <img src="${g.icon}" class="gift-icon">
          <h4 class="gift-title">${g.title}</h4>
          <p class="gift-desc">${g.desc}</p>
        </div>
      `;
    });

    /* ================= DRESSCODE ================= */
    document.getElementById("dresscodeType").innerHTML = data.dresscode.type;
    document.getElementById("dresscodeImage").src = data.dresscode.image;
    document.getElementById("dresscodeNote").innerHTML = data.dresscode.note;

    const men = document.getElementById("dresscodeMen");
    data.dresscode.men.forEach(i => men.innerHTML += `<li>${i}</li>`);

    const women = document.getElementById("dresscodeWomen");
    data.dresscode.women.forEach(i => women.innerHTML += `<li>${i}</li>`);

    /* ================= GALLERY ================= */
    const gallery = document.getElementById("galleryGrid");
    data.gallery.forEach(img => {
      gallery.innerHTML += `<img src="${img}" alt="">`;
    });

    /* ================= RSVP ================= */
    document.getElementById("rsvpIntro").innerHTML = data.rsvp.intro;
    document.getElementById("rsvpNote").innerHTML = data.rsvp.note;
    document.getElementById("rsvpSuccess").innerHTML = data.rsvp.success;
  });
