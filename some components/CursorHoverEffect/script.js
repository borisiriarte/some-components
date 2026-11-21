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
