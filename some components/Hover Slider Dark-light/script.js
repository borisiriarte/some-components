(function () {
  const $link = document.querySelectorAll("nav > .hover-this");
  const $cursor = document.querySelector(".cursor");

  const animateIt = function (e) {
    const $span = this.querySelector("span");
    console.log(e.offsetX + " -- " + this.offsetWidth);
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this;
    const move = 100,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;

    $span.style.transform = `translate(${-xMove}px, ${-yMove}px)`;

    if (e.type === "mouseleave") $span.style.transform = "";
  };

  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    $cursor.style.left = x + "px";
    $cursor.style.top = y + "px";
  };

  $link.forEach((b) => b.addEventListener("mousemove", animateIt));
  $link.forEach((b) => b.addEventListener("mouseleave", animateIt));
  window.addEventListener("mousemove", editCursor);
})();
