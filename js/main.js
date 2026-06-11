const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

if (menuToggle && siteMenu) {
  const menuLinks = siteMenu.querySelectorAll("a");

  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
let revealObserver;

if ("IntersectionObserver" in window && revealItems.length > 0) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && navAnchors.length > 0 && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navAnchors.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * 5;
    const rotateY = (px - 0.5) * 7;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

async function loadWritingArticles() {
  const list = document.getElementById("article-list");

  if (!list) {
    return;
  }

  try {
    const response = await fetch("./articles.json");

    if (!response.ok) {
      throw new Error(`Failed to load articles: ${response.status}`);
    }

    const articles = await response.json();

    list.innerHTML = "";

    articles.slice(0, 3).forEach((article, index) => {
      const card = document.createElement("a");
      card.className = `article-card reveal${index === 0 ? " delay-1" : index === 1 ? " delay-2" : ""}`;
      card.href = article.link || "#";
      card.target = "_blank";
      card.rel = "noreferrer";

      const thumbinal = document.createElement("div");
      thumbinal.className = "article-thumbinal";
      const image = document.createElement("img");
      image.src = article.image;
      image.alt = article.heading;
      thumbinal.appendChild(image);

      const copy = document.createElement("div");
      copy.className = "article-copy";
      const heading = document.createElement("h3");
      heading.textContent = article.heading;
      const excerpt = document.createElement("p");
      excerpt.textContent = article.excerpt;
      copy.appendChild(heading);
      copy.appendChild(excerpt);

      card.appendChild(thumbinal);
      card.appendChild(copy);
      list.appendChild(card);

      if (revealObserver) {
        revealObserver.observe(card);
      }

      // Ensure dynamically inserted cards are visible even if the reveal observer misses them.
      card.classList.add("is-visible");
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadWritingArticles);
