const d = document,
  w = window;

//These two options get work the same
const $canvas = document.getElementById("starfield");
const canvas = document.getElementsByTagName("canvas")[0];

const ctx = $canvas.getContext("2d");
// console.log(ctx);
const positons = [];

const NUMBER_OF_STARS = 4;
const COLOT_WHITE = "white";
let width, height;
let oldBackground, newBackground;

//Star properties
let l = 5;
let step = 11;

let star = l / step;
let rad = (2 * Math.PI) / star;
let R = 3;

let t = 0;

const colors = [
  "rgba(175, 251, 253, 0.8)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(250, 243, 153, 0.8)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(245, 136, 121, 0.8)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0)",
];

// console.log(window.screenY + " - " + w.innerHeight);
// console.log(window.screenX + " - " + w.innerWidth);

canvas.width = w.innerWidth;
canvas.height = w.innerHeight;

width = canvas.width;
height = canvas.height;

function randomIntBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function mathRandomize(unitMeasurement) {
  return Math.floor(Math.random() * unitMeasurement - 1);
}

function initLayout() {
  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    let x = mathRandomize(width);
    let y = mathRandomize(height);

    savePositions(x, y);

    ctx.beginPath();

    ctx.shadowColor = `${colors[randomIntBetween(1, 11)]}`;
    ctx.shadowBlur = 20;

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLOT_WHITE;
    ctx.beginPath();
    ctx.arc(x, y, randomIntBetween(3, 3), 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function savePositions(x, y) {
  positons.push({ x, y });
}

console.log(positons);

function joinDots(a, b, context) {
  // ctx.clearRect(0, 0, context.width, context.height);
  const c = vLerp(a, b, t);
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(c.x, c.y);
  context.strokeStyle = "white";
  context.lineWidth = 1;
  ctx.stroke();
  context.closePath();
  t *= 0.2 ** 2;
  // if (t > 1.000000001) {
  //   t = 0;
  // } else {
  //   joinDots(c, b, context);
  // }
}

const drawLine = () => {
  let posA = positons[randomIntBetween(0, positons.length - 1)];
  let posB = positons[randomIntBetween(0, positons.length - 1)];

  if (posA !== posB) {
    joinDots(posA, posB, ctx);
  } else {
    drawLine();
  }
  // posA = posB;
  // posB = positons[randomIntBetween(0, positons.length - 1)];
};

function vLerp(A, B, t) {
  const res = {};
  for (let attr in A) {
    res[attr] = lerp(A[attr], B[attr], t);
  }
  return res;
}

function lerp(min, max, t) {
  return min + (max - min) * t;
}

document.addEventListener("DOMContentLoaded", initLayout);
window.addEventListener("click", drawLine);
