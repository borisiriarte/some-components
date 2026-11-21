const $starsBox = document.getElementById("starsBox");

console.log($starsBox);

const cols = ["#f5d76e", "#f7ca18", "#f4d03f", "#ececec", "#ecf0f1", "#a2ded0"];
const STARS = 250;
const random = parseInt(Math.random() * 100);

for (let i = 0; i < STARS; i++) {
  let size = Math.random() * 4;
  let color = cols[parseInt(Math.random() * 5)];

  let elem = document.createElement("span");
  elem.style.width = size + "px";
  elem.style.height = size + "px";
  elem.style.top = Math.random() * 50 + "%";
  elem.style.left = Math.random() * 50 + "%";
  elem.style.background = color;
  elem.style.boxShadow = "0 0 " + Math.random() * 10 + "px" + color;

  $starsBox.prepend(elem);
}

console.log(Math.random() * 100);

let move = function () {
  let $spanStar = $starsBox.childNodes;
  console.log($spanStar);
  $spanStar.forEach((star) => {
    star.style.top = Math.random() * random + "%";
    star.style.left = Math.random() * random + "%";
    // star.style.opacity = Math.random * 5;
  });
};

setTimeout(() => {
  move();
}, 1);

setInterval(() => {
  move();
}, 100000);

(function () {
  const $body = document.getElementsByTagName("body")[0];
  const $c1 = document.getElementById("cursor"),
    $c2 = document.getElementById("cursor2");
  const $links = document.querySelectorAll("li > .hover-link");

  console.log($links);

  const cursorPosition = (e) => {
    const { clientX: x, clientY: y } = e;
    $c1.style.left = x + "px";
    $c1.style.top = y + "px";
    $c2.style.left = x + "px";
    $c2.style.top = y + "px";
  };

  const mouseOver = (e) => {
    $c2.classList.add("hover");
  };

  const mouseOut = (e) => {
    const $a = e.target;
    $c2.classList.remove("hover");
  };

  $links.forEach((b) => b.addEventListener("mouseover", mouseOver));
  $links.forEach((b) => b.addEventListener("mouseout", mouseOut));

  $body.addEventListener("mousemove", cursorPosition);
})();
