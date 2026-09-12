let products = [], activeCategory = "All";
const $ = s => document.querySelector(s);
const productsEl = $("#products"), filtersEl = $("#filters"), searchEl = $("#search");

async function loadProducts() {
    try {
        const res = await fetch("products.json");
        const data = await res.json();
        products = data.products;
        renderFilters(data.categories);
        renderProducts();
    } catch (e) {
        productsEl.innerHTML = "<p>Could not load the product catalogue. Please open this site through a local web server.</p>";
    }
}

function renderFilters(categories) {
    filtersEl.innerHTML = categories.map(c => `<button class="filter ${c === "All" ? "active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
    filtersEl.addEventListener("click", e => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        activeCategory = btn.dataset.cat;
        document.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x === btn));
        renderProducts();
    });
}

function renderProducts() {
    const q = searchEl.value.trim().toLowerCase();
    const list = products.filter(p => (activeCategory === "All" || p.category === activeCategory) &&
        (!q || `${p.name} ${p.category} ${p.group}`.toLowerCase().includes(q)));
    productsEl.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img"><img loading="lazy" src="${p.image}" alt="${escapeHtml(p.name)}"></div>
      <div class="product-info"><small>${escapeHtml(p.category)}</small><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.price)}</p></div>
    </article>`).join("");
    $("#empty").hidden = list.length !== 0;
    document.querySelectorAll(".product-card").forEach(c => c.addEventListener("click", () => openModal(c.dataset.id)));
}

function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    $("#modalImg").src = p.image;
    $("#modalImg").alt = p.name;
    $("#modalCat").textContent = p.category;
    $("#modalTitle").textContent = p.name;
    $("#modalDesc").textContent = p.description;
    $("#modalPrice").textContent = p.price;
    $("#modalFb").href = `https://www.facebook.com/profile.php?id=61594484002697`;
    $("#modal").classList.add("open");
    $("#modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    $("#modal").classList.remove("open");
    $("#modal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""
}

document.addEventListener("click", e => {
    if (e.target.matches("[data-close]")) closeModal()
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal()
});
searchEl.addEventListener("input", renderProducts);
$(".menu-btn").addEventListener("click", () => $(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => $(".nav-links").classList.remove("open")));
const headerEl = $(".site-header");

function setHeader() {
    headerEl.classList.toggle("fixed", window.scrollY > 80)
}

window.addEventListener("scroll", setHeader, {passive: true});
setHeader();
$("#year").textContent = new Date().getFullYear();

function escapeHtml(v) {
    return String(v).replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[m]))
}

const heroImages = [
    "assets/slider/slider-1.jpg",
    "assets/slider/slider-2.jpg",
    "assets/slider/slider-3.jpg"
];
let slideIndex = 0;
const heroSlides = $("#heroSlides");

function buildHero() {
    heroSlides.innerHTML = heroImages.map(src => `<div class="hero-slide"><img src="${src}" alt="Madina Furniture piece"></div>`).join("");
    goSlide(0);
    setInterval(() => goSlide(slideIndex + 1), 2000);
}

function goSlide(i) {
    slideIndex = (i + heroImages.length) % heroImages.length;
    document.querySelectorAll(".hero-slide").forEach((s, j) => s.classList.toggle("active", j === slideIndex));
}

buildHero();

loadProducts().then();
