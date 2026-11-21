//Esta parte crea una imagen
let img = new Image();

img.src = "/assets/Wide-field_image_of_Leo_and_Arp_87_article.jpg";

let oldX = 0,
  oldY = 0;

//Acá creamos los datos de la imagen fuente, y la imagen destino
let imageDataDst, imageDataSrc;

let w = 1024;
let h = 512;

// Esto es una interpolación lineal
//Donde a: inicio y b: final. Y t es un valor que esta dentro de l innormalmente va de 1 a 0
let lerp = function (a, b, t) {
  return (b - a) * (1 - Math.exp(-t) + a);
  // return a * (1 - t) + b * t;
};

const smootherstep = (t) => {
  return 1 / Math.exp(-6 * t + 3) - Math.exp(-3);
};

const canvas = document.querySelector("canvas");
const dst = canvas.getContext("2d", { willReadFrequently: true });

window.onload = function () {
  let i = 0,
    px = 0,
    py = 320,
    ti = 0;

  //Aca ponemos el ancho y alto de la imagen a variables
  w = img.width;
  h = img.height;

  // const canvas = document.querySelector("canvas");
  //Aca le damos el ancho y el alto al lienzo
  canvas.width = w;
  canvas.height = h;

  // const dst = canvas.getContext("2d", { willReadFrequently: true });
  dst.drawImage(img, 0, 0, w, h);
  //Acá le añadimos a la imagen destino y a la imagen fuente nuestra imagen
  imageDataSrc = dst.getImageData(0, 0, w, h);
  imageDataDst = dst.getImageData(0, 0, w, h);

  const timer = setInterval(() => {
    if (ti++ > 100) {
      clearInterval(timer);
    }

    updateCanvas(canvas, lerp(0, 900, ti / 20), py);
  }, 16);

  canvas.addEventListener(
    "mousemove",
    function (e) {
      let mousePosition = getMousePosition(canvas, e);
      updateCanvas(canvas, mousePosition.x, mousePosition.y);
    },
    false
  );
};

const updateCanvas = (canvas, px, py) => {
  let context = canvas.getContext("2d");

  let r = 100;

  let xmin = oldX - r,
    xmax = oldX + r;
  let ymin = oldY - r,
    ymax = oldY + r;

  if (xmin < 0) xmin = 0;
  if (xmax > w) xmax = w;
  if (ymin < 0) ymin = 0;
  if (ymax > w) ymax = h;

  for (let y = ymin; y < ymax; y++) {
    for (let x = xmin; x < xmax; x++) {
      let index = (x + y * w) << 2;
      imageDataDst.data[index] = imageDataSrc.data[index++];
      imageDataDst.data[index] = imageDataSrc.data[index++];
      imageDataDst.data[index] = imageDataSrc.data[index++];
      imageDataDst.data[index] = 255;
    }
  }

  let dstdata = imageDataDst.data;
  let srcdata = imageDataSrc.data;

  xmin = px - r;
  xmax = px + r;
  ymin = py - r;
  ymax = py + r;

  if (xmin < 0) xmin = 0;
  if (xmax > w) xmax = w;
  if (ymin < 0) ymin = 0;
  if (ymax > w) ymax = h;

  let tol = -15;
  let maxSize = w * (h - 1) + w - 1;

  for (y = ymin; y < ymax; y++) {
    index = (xmin + y * w) << 2;
    for (x = xmin; x < xmax; x++) {
      let x1 = x - px;
      let y1 = y - py;
      let d = Math.sqrt(x1 * x1 + y1 * y1);
      if (d <= r) {
        let sc = 1 - smootherstep((r - d) / r);
        //sc = 1;
        let xx = Math.floor(px + x1 * sc);
        let yy = Math.floor(py + y1 * sc);

        //Antialiasing
        if (sc < tol * 0.9 && sc > tol * 1.1) sc = 0.9;
        else if (sc < tol) sc = 0.1;
        else sc = 1;
        //end of lens math
        let index2 = (xx + yy * w) % maxSize << 2;
        dstdata[index++] = sc * srcdata[index2 + 0];
        dstdata[index++] = sc * srcdata[index2 + 1];
        dstdata[index++] = sc * srcdata[index2 + 2];
        index++;
      } else {
        index = index + 4;
      }
    }
  }
  imageDataDst.data = dstdata;
  dst.putImageData(imageDataDst, 0, 0);
  oldx = px;
  oldy = py;
};

const getMousePosition = (canvas, evt) => {
  let rect = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
};
