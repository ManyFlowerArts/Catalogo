const collections = [
  {
    name: "DUNAS",
    bg: "./Colecoes/Dunas/bg.png",
    model: "./Colecoes/Dunas/models/Duna1.glb"
  },
  {
    name: "LAYERS",
    bg: "./Colecoes/Layers/bg.png",
    model: "./Colecoes/Layers/models/Duna1.glb"
  },
  {
    name: "CRAQUELADOS",
    bg: "./Colecoes/Craquelados/bg.png",
    model: "./Colecoes/Craquelados/models/Duna1.glb"
  }
];

let currentIndex = 0;
let autoSlide;

const heroBg = document.getElementById("heroBg");
const collectionTitle = document.getElementById("collectionTitle");
const collectionModel = document.getElementById("collectionModel");
const sliderDots = document.getElementById("sliderDots");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

function createDots() {
  sliderDots.innerHTML = "";

  collections.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      renderSlide();
      restartAutoSlide();
    });
    sliderDots.appendChild(dot);
  });
}

function renderSlide() {
  const currentCollection = collections[currentIndex];

  heroBg.style.backgroundImage = `url("${currentCollection.bg}")`;
  collectionTitle.textContent = currentCollection.name;
  collectionModel.setAttribute("src", currentCollection.model);

  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function next() {
  currentIndex = (currentIndex + 1) % collections.length;
  renderSlide();
}

function prev() {
  currentIndex = (currentIndex - 1 + collections.length) % collections.length;
  renderSlide();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    next();
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

prevSlide.addEventListener("click", () => {
  prev();
  restartAutoSlide();
});

nextSlide.addEventListener("click", () => {
  next();
  restartAutoSlide();
});

createDots();
renderSlide();
startAutoSlide();
