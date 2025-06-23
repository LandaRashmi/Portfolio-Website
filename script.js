// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "light" ? "dark" : "light");
  themeToggle.textContent = current === "light" ? "☀️" : "🌙";
});

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// CLICK LOGO TO SCROLL TO TOP
const logo = document.getElementById("logo");
if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// INTERSECTION OBSERVER FOR ALL SECTIONS
const animatedElements = document.querySelectorAll(".tab-section, .timeline-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.15 });

animatedElements.forEach(el => observer.observe(el));

// OPEN PROJECT LINKS
function openProject(url) {
  window.open(url, "_blank");
}

// STAR CANVAS BACKGROUND (Only active in dark mode)
const canvas = document.getElementById("starCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.2,
      });
    }
  }

  createStars(200);

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.opacity += (Math.random() - 0.5) * 0.05;
      if (star.opacity < 0) star.opacity = 0;
      if (star.opacity > 1) star.opacity = 1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animateStars);
  }

  // Start star animation only if dark theme is active
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    animateStars();
  }

  // Re-check theme on toggle
  themeToggle.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      animateStars();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
}
