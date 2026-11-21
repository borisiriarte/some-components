let options = {
  rotateClass: "L2R",
};

const colors = [
  "rgb(175, 251, 253)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgb(250, 243, 153)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgb(245, 136, 121)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
];

function config() {
  layout();
  createStars(1000);
  startRotate();
}

function layout() {
  let h = window.innerHeight * 2;
  let w = window.innerWidth * 2;
  // let newSize = Math.max(width, height) * 1.5;

  document.getElementsByTagName("body")[0].style.height =
    window.innerHeight + "px";
  console.log(document.getElementsByTagName("body")[0].style);

  let starContainer = document.getElementById("starField");
  starContainer.style.width = w + "px";
  starContainer.style.height = h + "px";
}

function startRotate(direction) {
  document.getElementById("starField").classList.add("rotateL2R");
}

function stopRotate() {
  document.getElementById("starField").classList.remove("rotateL2R");
}

function doResize() {
  stopRotate();

  //remove all stars and regen
  document.getElementById("starField").innerHTML = "";
  config();
}

function randomIntBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function createStars(numStars) {
  let starsContainer = document.getElementById("starField");
  let w = starsContainer.clientWidth,
    h = starsContainer.clientHeight - 80;

  for (i = 0; i < numStars; i++) {
    let size = randomIntBetween(1, 2),
      color = randomIntBetween(1, 11),
      x = Math.min(randomIntBetween(1, w), w - size - 5),
      y = Math.min(randomIntBetween(1, h), h - size - 5);

    let elem = document.createElement("div");
    elem.className = "star";
    elem.style.top = y + "px";
    elem.style.left = x + "px";
    elem.style.width = size + "px";
    elem.style.height = size + "px";

    let elem2 = document.createElement("div");
    elem2.className = "star2";
    elem2.style.top = y - 10 + "px";
    elem2.style.left = x - 10 + "px";
    elem2.style.width = size + 20 + "px";
    elem2.style.height = size + 20 + "px";
    elem2.style.backgroundColor = `${colors[color - 1]}`;

    starsContainer.appendChild(elem);
    starsContainer.appendChild(elem2);
  }
}
// --mask: radial-gradient(7px at 7px 7px, #0000 150%, #000) -7px -7px;
//   -webkit-mask: var(--mask);
//   mask: var(--mask);
//----------------------------------------------------------------------------------------
//register event handlers
window.addEventListener("resize", doResize);
document.addEventListener("DOMContentLoaded", config);
