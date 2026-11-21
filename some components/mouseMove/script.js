const $dot = document.getElementById("dot");
const $container = document.querySelector(".container");

const mousePosition = (e) => {
  const { clientX: x, clientY: y } = e;

  $dot.style.left = x + "px";
  $dot.style.top = y + "px";
};

const mouseOver = (e) => {
  const target = e.currentTarget.getBoundingClientRect();
  $dot.classList.add("active");
};

const mouseLeave = (e) => {
  $dot.classList.remove("active");
};

window.addEventListener("mousemove", mousePosition);
$container.addEventListener("mouseover", mouseOver);
$container.addEventListener("mouseout", mouseLeave);
