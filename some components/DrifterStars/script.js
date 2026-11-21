const $body = document.body.style;
const $container = document.getElementById("container");
const $divs = document.querySelectorAll("body > div");
let counterWidth = 10;
let initialHeight = window.innerHeight;
let initialWidth = window.innerWidth;
let newHeight, newWidth;
const UNITS_TO_MOVE = 25;

// console.log("" + screen.width + "--" + screen.height);
// console.log("" + window.outerWidth + "--" + window.outerHeight);
// console.log("" + window.innerWidth + "--" + window.innerHeight);

const handleResize = () => {
  const { innerHeight, innerWidth } = window;

  newHeight = innerHeight;
  newWidth = innerWidth;

  console.log(initialWidth + " -- " + newWidth);
  if (newWidth < initialWidth) {
    counterWidth++;
  } else {
    counterWidth--;
  }

  initialWidth = newWidth;

  $container.style.backgroundColor = "blue";
  $container.style.height = counterWidth + "px";
};

const createRandomNumber = () => {
  const rndNumber = Math.ceil(Math.random() * 4);
  console.log(rndNumber);
};

const handleMove = function (e) {
  console.log({ thisContainer: this });
  console.log({ container: $container });
  console.log({ event: e });
  const { offsetX: x, offsetY: y } = e;
  const { offsetWidth: width, offsetHeight: height } = this;

  const xMove = (x / width) * (UNITS_TO_MOVE * 2) - UNITS_TO_MOVE;
  const yMove = (y / height) * (UNITS_TO_MOVE * 2) - UNITS_TO_MOVE;

  e.target.style.transform = `translate(${-xMove}px,${-yMove}px)`;

  if (e.type === "mouseleave") e.target.style.transform = "";
};

window.addEventListener("resize", createRandomNumber);
$divs.forEach((b) => b.addEventListener("mousemove", handleMove));
$divs.forEach((b) => b.addEventListener("mouseleave", handleMove));
