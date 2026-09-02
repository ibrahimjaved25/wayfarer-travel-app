// ---------- Recommendation data ----------
// Each place has a type (beach / temple / country) and two images.
const recommendations = [
  {
    type: "beach",
    name: "Railay Beach, Thailand",
    description: "A limestone-cliff beach reachable only by longtail boat — climbers by day, lantern-lit shoreline by night.",
    images: [
      "https://picsum.photos/id/1043/400/300",
      "https://picsum.photos/id/1074/400/300"
    ]
  },
  {
    type: "beach",
    name: "Navagio Bay, Greece",
    description: "A shipwreck rusting in white sand, boxed in by sheer cliffs on the island of Zakynthos.",
    images: [
      "https://picsum.photos/id/1035/400/300",
      "https://picsum.photos/id/1039/400/300"
    ]
  },
  {
    type: "beach",
    name: "Whitehaven Beach, Australia",
    description: "Silica sand so fine it squeaks underfoot, swirling into turquoise water at Hill Inlet.",
    images: [
      "https://picsum.photos/id/1076/400/300",
      "https://picsum.photos/id/1080/400/300"
    ]
  },
  {
    type: "temple",
    name: "Angkor Wat, Cambodia",
    description: "The largest religious monument on earth, best seen as the sandstone towers catch first light.",
    images: [
      "https://picsum.photos/id/1031/400/300",
      "https://picsum.photos/id/1033/400/300"
    ]
  },
  {
    type: "temple",
    name: "Kinkaku-ji, Japan",
    description: "A gold-leaf pavilion set over a still pond in Kyoto — most striking under a dusting of snow.",
    images: [
      "https://picsum.photos/id/1041/400/300",
      "https://picsum.photos/id/1042/400/300"
    ]
  },
  {
    type: "temple",
    name: "Meenakshi Temple, India",
    description: "Fourteen carved gopuram towers rising over Madurai, covered top to bottom in painted deities.",
    images: [
      "https://picsum.photos/id/1044/400/300",
      "https://picsum.photos/id/1047/400/300"
    ]
  },
  {
    type: "country",
    name: "Peru",
    description: "From Andean peaks to Amazon lowlands to Pacific coast — three distinct countries in one.",
    images: [
      "https://picsum.photos/id/1018/400/300",
      "https://picsum.photos/id/1021/400/300"
    ]
  },
  {
    type: "country",
    name: "New Zealand",
    description: "Glacier, fjord, geyser, and beach within a single day's drive on either island.",
    images: [
      "https://picsum.photos/id/1015/400/300",
      "https://picsum.photos/id/1016/400/300"
    ]
  },
  {
    type: "country",
    name: "Morocco",
    description: "Blue-washed mountain towns, Saharan dunes, and Atlantic surf towns, all a few hours apart.",
    images: [
      "https://picsum.photos/id/1024/400/300",
      "https://picsum.photos/id/1025/400/300"
    ]
  }
];

const resultsEl = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll(".btn-filter");

const typeLabels = {
  beach: "Beaches",
  temple: "Temples",
  country: "Countries"
};

function renderCard(item) {
  return `
    <div class="rec-card">
      <div class="img-pair">
        <img src="${item.images[0]}" alt="${item.name} — view one">
        <img src="${item.images[1]}" alt="${item.name} — view two">
      </div>
      <div class="rec-card-body">
        <span class="place-type">${typeLabels[item.type]}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `;
}

function renderResults(items, groupByType) {
  if (!resultsEl) return;

  if (items.length === 0) {
    resultsEl.innerHTML = `<p class="results-hint">No recommendations matched your search. Try a different name or category.</p>`;
    return;
  }

  if (!groupByType) {
    resultsEl.innerHTML = `<div class="card-grid">${items.map(renderCard).join("")}</div>`;
    return;
  }

  const types = ["beach", "temple", "country"];
  let html = "";
  types.forEach(type => {
    const group = items.filter(i => i.type === type);
    if (group.length === 0) return;
    html += `<h2 class="results-heading">${typeLabels[type]}</h2>`;
    html += `<div class="card-grid">${group.map(renderCard).join("")}</div>`;
  });
  resultsEl.innerHTML = html;
}

function filterByType(type) {
  filterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.type === type));
  searchInput.value = "";
  const matches = recommendations.filter(item => item.type === type);
  renderResults(matches, false);
}

function searchByName(query) {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  const q = query.trim().toLowerCase();
  if (q === "") {
    resultsEl.innerHTML = `<p class="results-hint">Choose a category above, or search by name, to see recommendations here.</p>`;
    return;
  }
  const matches = recommendations.filter(item =>
    item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
  );
  renderResults(matches, true);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => filterByType(btn.dataset.type));
});

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    searchInput.value = "";
    resultsEl.innerHTML = `<p class="results-hint">Choose a category above, or search by name, to see recommendations here.</p>`;
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => searchByName(e.target.value));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchByName(searchInput.value);
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => searchByName(searchInput.value));
}

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// ---------- Contact form ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Thanks — your message has been sent. We'll reply within two business days.";
    contactForm.reset();
  });
}