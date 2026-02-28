/*=============== HOME SPLIT TEXT ===============*/
const { animate, text, stagger } = anime;

const { chars: chars1 } = text.split(".home__profession-1", { chars: true });
const { chars: chars2 } = text.split(".home__profession-2", { chars: true });

animate(chars1, {
  y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 4000, ease: "in(3)" }],
  duration: 900,
  ease: "out(3)",
  delay: stagger(80),
  loop: true,
});

animate(chars2, {
  y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 4000, ease: "in(3)" }],
  duration: 900,
  ease: "out(3)",
  delay: stagger(80),
  loop: true,
});

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper(".projects__swiper", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,
  speed: 600,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents =
  document.querySelectorAll("[data-content]"); /* ✅ fix: tambah const */

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetSelector = tab.dataset.target,
      targetContent = document.querySelector(targetSelector);

    tabContents.forEach((content) => content.classList.remove("work-active"));
    tabs.forEach((t) => t.classList.remove("work-active"));

    tab.classList.add("work-active");
    targetContent.classList.add("work-active");
  });
});

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll(".services__button");

servicesButtons.forEach((button) => {
  /* ✅ fix: set height awal hanya untuk card yang services-open */
  const parentCard = button.parentNode;
  if (parentCard.classList.contains("services-open")) {
    const info = parentCard.querySelector(".services__info");
    info.style.height = info.scrollHeight + "px";
  }

  button.addEventListener("click", () => {
    const servicesCards = document.querySelectorAll(".services__card"),
      currentCard = button.parentNode,
      currentInfo = currentCard.querySelector(".services__info"),
      isCardOpen = currentCard.classList.contains("services-open");

    servicesCards.forEach((card) => {
      card.classList.replace("services-open", "services-close");
      card.querySelector(".services__info").style.height = "0";
    });

    if (!isCardOpen) {
      currentCard.classList.replace("services-close", "services-open");
      currentInfo.style.height = currentInfo.scrollHeight + "px";
    }
  });
});

/*=============== CERTIFICATES SWIPER ===============*/
const swiperCertificates = new Swiper(".certificates__swiper", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,
  speed: 500,

  pagination: {
    el: ".certificates__pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

/*=============== CERTIFICATES MODAL ===============*/
const certButtons = document.querySelectorAll(".certificates__button");
const certModal = document.getElementById("cert-modal");
const certModalClose = document.getElementById("cert-modal-close");
const certModalImg = document.getElementById("cert-modal-img");
const certModalTitle = document.getElementById("cert-modal-title");
const certModalIssuer = document.getElementById("cert-modal-issuer");
const certModalDate = document.getElementById("cert-modal-date");
const certModalDesc = document.getElementById("cert-modal-desc");

// Buka modal saat tombol "View Certificate" diklik
certButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // cegah event bubble ke card

    certModalImg.src = btn.dataset.img || "";
    certModalImg.alt = btn.dataset.title;
    certModalTitle.textContent = btn.dataset.title;
    certModalIssuer.textContent = btn.dataset.issuer;
    certModalDate.textContent = btn.dataset.date;
    certModalDesc.textContent = btn.dataset.desc;

    certModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Tutup modal
certModalClose.addEventListener("click", closeModal);

certModal.addEventListener("click", (e) => {
  if (e.target === certModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal.classList.contains("active")) {
    closeModal();
  }
});

function closeModal() {
  certModal.classList.remove("active");
  document.body.style.overflow = "";
}

/*=============== TESTIMONIALS DUPLICATE CARDS ===============*/
const tracks = document.querySelectorAll(".testimonials__content");

tracks.forEach((track) => {
  const cards = [...track.children];
  for (const card of cards) {
    track.appendChild(card.cloneNode(true));
  }
});

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById("contact-btn"),
  copyEmail = document.getElementById("contact-email").textContent;

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email Copied <i class="ri-check-line"></i>';
    setTimeout(() => {
      copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>';
    }, 2000);
  });
});

/*=============== CURRENT YEAR IN FOOTER ===============*/
const textYear = document.getElementById("footer-year");
const currentYear = new Date().getFullYear(); /* ✅ fix: tambah const */
textYear.textContent = currentYear;

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id,
      top = section.offsetTop - 50,
      height = section.offsetHeight,
      link = document.querySelector(".nav__menu a[href*=" + id + "]");

    if (!link) return;

    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height,
    );
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;

const cursorMove = () => {
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  cursor.style.transform = "translate(-50%, -50%)";
  requestAnimationFrame(cursorMove);
};

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorMove();

const interactables = document.querySelectorAll("a, button");

interactables.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hide-cursor");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hide-cursor");
  });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 300,
});

sr.reveal(".home__image, .projects__container, .work__container");
sr.reveal(".home__data", { delay: 900, origin: "bottom" });
sr.reveal(".home__info", { delay: 1200, origin: "bottom" });
sr.reveal(".home__social, .home__cv", { delay: 1500 });
sr.reveal(".about__data", { origin: "left" });
sr.reveal(".about__image", { origin: "right" });
sr.reveal(".services__card", { interval: 100 });
