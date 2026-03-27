const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const timelineItems = document.querySelectorAll(".timeline-item");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) {
      nav.classList.remove("open");
    }
  });
});

if (navLinks.length > 0 && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0
    }
  );

  document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  // Fallback for older mobile browsers.
  revealItems.forEach((item) => item.classList.add("show"));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const period = button.dataset.period;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    timelineItems.forEach((item) => {
      const shouldShow = period === "all" || item.dataset.period === period;
      item.classList.toggle("hidden-by-filter", !shouldShow);
    });
  });
});
