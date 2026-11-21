const { gsap } = window;

const $c1 = document.querySelector(".cursor1"),
  $c2 = document.querySelector(".cursor2");
let isStuck = false;
let mouse = {
  x: -100,
  y: -100,
};
const $btns = document.querySelectorAll("main button");

let c1OriginalState = {
  width: $c1.getBoundingClientRect().width,
  height: $c1.getBoundingClientRect().height,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener("scroll", function (e) {
  scrollHeight = this.window.scrollY;
  console.log(scrollHeight);
});

// ------------------------------

const handleMouseEnter = (e) => {
  isStuck = true;
  const targetBox = e.currentTarget.getBoundingClientRect();
  gsap.to($c1, 0.2, {
    x: targetBox.left,
    y: targetBox.top + scrollHeight,
    width: targetBox.width,
    height: targetBox.height,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  });
};

const handleMouseLeave = (e) => {
  isStuck = false;
  gsap.to($c1, 0.2, {
    width: c1OriginalState.width,
    height: c1OriginalState.height,
    borderRadius: "50%",
    backgroundColor: "transparent",
  });
};

//--------------------------------

const updateCursorPosition = (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  // console.log(e.pageX, e.pageY);
};

const updateCursor = (e) => {
  gsap.set($c2, {
    x: mouse.x,
    y: mouse.y,
  });

  if (!isStuck) {
    gsap.to($c1, {
      duration: 0.15,
      x: mouse.x - c1OriginalState.width / 2,
      y: mouse.y - c1OriginalState.height / 2,
    });
  }

  requestAnimationFrame(updateCursor);
};

$btns.forEach((button) => {
  button.addEventListener("pointerenter", handleMouseEnter);
  button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);

updateCursor();

document.body.addEventListener("pointerdown", () => {
  gsap.to($c2, 0.15, {
    scale: 2,
  });
});
document.body.addEventListener("pointerup", () => {
  gsap.to($c2, 0.15, {
    scale: 1,
  });
});
