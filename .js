// ============= THEME TOGGLE =============
const body = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn?.querySelector("i");

// load theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

themeToggleBtn?.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");

  if (themeIcon) {
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);
  }

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ============= MOBILE MENU TOGGLE =============
const menuToggleBtn = document.getElementById("menu-toggle");
const menuIcon = menuToggleBtn?.querySelector("i");
const mainNav = document.getElementById("main-nav");

menuToggleBtn?.addEventListener("click", () => {
  if (!mainNav) return;
  const isOpen = mainNav.classList.toggle("open");

  if (menuIcon) {
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
  }
});

// close mobile menu when a nav link is clicked
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      if (menuIcon) {
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
      }
    }
  });
});

// ============= TYPING EFFECT =============
const taglineEl = document.getElementById("tagline");
if (taglineEl) {
  const text = taglineEl.dataset.text || "";
  taglineEl.textContent = "";
  let i = 0;

  function type() {
    if (i <= text.length) {
      taglineEl.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  }

  type();
}

// ============= PARALLAX BACKGROUND =============
document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".layer");
  const x = e.clientX;
  const y = e.clientY;
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;

  layers.forEach((layer) => {
    const speed = parseFloat(layer.getAttribute("data-speed")) || 0.1;
    const offsetX = (x - midX) * speed * -1;
    const offsetY = (y - midY) * speed * -1;
    layer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});

// ============= SMOOTH SCROLL ON LINKS =============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============= MODAL FOR CARDS =============
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModal");

function openModalFromCard(card) {
  if (!modal || !modalTitle || !modalText) return;

  const title = card.querySelector("h3")?.innerText || "";
  const para = card.querySelector("p:not(.card-sub)")?.innerText || "";

  modalTitle.innerText = title;
  modalText.innerText = para;
  modal.classList.add("open");
}

document.querySelectorAll(".card.clickable").forEach((card) => {
  card.addEventListener("click", () => openModalFromCard(card));
});

closeModalBtn?.addEventListener("click", () => {
  modal?.classList.remove("open");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
  }
});

// ============= SKILL CHIPS INTERACTION =============
document.querySelectorAll(".chip-list li").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip-list li").forEach((c) =>
      c.classList.remove("active")
    );

    chip.classList.add("active");

    chip.style.transform = "scale(1.1)";
    setTimeout(() => {
      chip.style.transform = "";
    }, 180);
  });
});

// ============= SOCIAL ICONS BOUNCE ON CLICK =============
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.style.transform = "scale(1.15) translateY(-2px)";
    icon.style.transition = "transform 0.15s ease";

    setTimeout(() => {
      icon.style.transform = "";
    }, 160);
  });
});
