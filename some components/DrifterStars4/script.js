let particleCount = 40,
  flareCount = 10,
  motion = 0.05,
  tilt = 0.05,
  color = "#FFEED4",
  particleSizeBase = 1,
  particleSizeMultiplier = 0.5,
  flareSizeBase = 100,
  flareSizeMultiplier = 100,
  lineWidth = 1,
  linkChance = 75, // chance per frame of link, higher = smaller chance
  linkLengthMin = 5, // min linked vertices
  linkLengthMax = 7, // max linked vertices
  linkOpacity = 0.25; // number between 0 & 1
(linkFade = 90), // link fade-out frames
  (linkSpeed = 1), // distance a link travels in 1 frame
  (glareAngle = -60),
  (glareOpacityMultiplier = 0.05),
  (renderParticles = true),
  (renderParticleGlare = true),
  (renderFlares = true),
  (renderLinks = true),
  (renderMesh = false),
  (flicker = true),
  (flickerSmoothing = 15), // higher = smoother flicker
  (blurSize = 0),
  (orbitTilt = true),
  (randomMotion = true),
  (noiseLength = 1000),
  (noiseStrength = 1);

let canvas = document.getElementById("stars"),
  context = canvas.getContext("2d"),
  mouse = { x: 0, y: 0 },
  m = {},
  r = 0,
  c = 1000, // multiplier for delaunay points, since floats too small can mess up the algorithm
  n = 0,
  nAngle = (Math.PI * 2) / noiseLength,
  nRad = 100,
  nScale = 0.5,
  nPos = { x: 0, y: 0 },
  points = [],
  vertices = [],
  triangles = [],
  links = [],
  particles = [],
  flares = [];

function init() {
  let i, j, k;
  window.requesAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  resize();

  mouse.x = canvas.clientWidth / 2;
  mouse.y = canvas.clientHeight / 2;

  //Create Particles Positions
  for (i = 0; i < particleCount; i++) {
    let p = new Particle();
    particles.push(p);
    points.push([p.x * c, p.y * c]);
  }

  console.log(particles);
  console.log(points);
}

function resize() {
  canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
  canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
}

//Particle Class
let Particle = function () {
  this.x = random(-0.1, 1.1, true);
  this.y = random(-0.1, 1.1, true);
  this.z = random(-0.1, 1.1, true);
  this.color = color;
  this.opacity = random(0.1, 1, true);
  this.flicker = 0;
  this.neighbors = [];
};

Particle.prototype.render = function () {
  let pos = position(this.x, this.y, this.z),
    r =
      (this.z * particleSizeMultiplier + particleSizeBase) *
      (sizeRatio() / 1000),
    o = this.opacity;

  if (flicker) {
    let newVal = random(-0.5, 0.5, true);
    this.flicker += (newVal - this.flicker) / flickerSmoothing;
    if (this.flicker > 0.5) this.flicker = 0.5;
    if (this.flicker < -0.5) this.flicker = -0.5;
    o += this.flicker;
    if (o > 1) o = 1;
    if (o < 0) o = 0;
  }

  context.fillStyle = this.color;
  context.globalAlpha = o;
  context.beginPath();
  context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

  if (renderParticleGlare) {
    context.globalAlpha = o * glareOpacityMultiplier;
    /*
		context.ellipse(pos.x, pos.y, r * 30, r, 90 * (Math.PI / 180), 0, 2 * Math.PI, false);
		context.fill();
		context.closePath();
		*/
    context.ellipse(
      pos.x,
      pos.y,
      r * 100,
      r,
      (glareAngle - (nPos.x - 0.5) * noiseStrength * motion) * (Math.PI / 180),
      0,
      2 * Math.PI,
      false
    );
    context.fill();
    context.closePath();
  }

  context.globalAlpha = 1;
};

function position(x, y, z) {
  return {
    x:
      x * canvas.width +
      (canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) *
        z *
        motion,
    y:
      y * canvas.height +
      (canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) *
        z *
        motion,
  };
}

function sizeRatio() {
  return canvas.width >= canvas.height ? canvas.width : canvas.height;
}

function random(min, max, float) {
  return float
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min + 1)) + min;
}

init();
