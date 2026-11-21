const d = document,
  w = window;

const $canvas = document.getElementById("starfield");
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = $canvas.getContext("2d");
let width, height;

const colors = [
  "rgba(175, 251, 253, 0.6)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(250, 243, 153, 0.6)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(245, 136, 121, 0.6)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
];

let oldBackground;
let newBackground;

canvas.width = w.innerWidth * 2;
canvas.height = w.innerHeight * 2;

width = canvas.width;
height = canvas.height;

console.log(canvas);

function randomIntBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

let l = 5;
let step = 11;

let star = l / step;
let rad = (2 * Math.PI) / star;
let R = 3;

(function layout() {
  // ctx.fillStyle = "black";
  // ctx.rect(0, 0, width, height);
  // ctx.fill();

  // ctx.fillStyle = `${colors[randomIntBetween(1, 11)]}`;
  // ctx.fillStyle = "white";
  for (let i = 0; i <= 1000; i++) {
    let x = 0 + Math.floor(Math.random() * width - 1);
    let y = 0 + Math.floor(Math.random() * height - 1);

    ctx.fillStyle = `${colors[randomIntBetween(1, 11)]}`;
    ctx.beginPath();
    for (let j = 0; j < l; j++) {
      let a = x + R * Math.cos(rad * j);
      let b = y + R + R * Math.sin(rad * j);
      ctx.lineTo(a, b);
      ctx.fill();
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 0.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // newBackground = ctx.getImageData(0, 0, 30, 30);
  // oldBackground = newBackground;
})();
