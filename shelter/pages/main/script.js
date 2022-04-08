"use strict";

//init
const burgerButton = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const logoLabel = document.querySelector(".logo");
const darkenLayer = document.querySelector(".darken-background");
const contentStartPage = document.querySelector(".content");

//functions
function clickBurgerBtn(e) {
  console.log(e);
  if (
    e.target === burgerButton ||
    e.target.classList.contains("line") ||
    e.target === darkenLayer
  ) {
    burgerMenu.classList.toggle("opened");
    burgerButton.classList.toggle("rotated");
    logoLabel.classList.toggle("logo-moved");
    darkenLayer.classList.toggle("bg-active");
    contentStartPage.classList.toggle("pushed_down");
  }
}

// Event listners
window.addEventListener("click", clickBurgerBtn);

window.addEventListener("resize", function () {
  if (!window.matchMedia("(min-width: 768px)").matches) {
    burgerMenu.classList.remove("opened");
    burgerButton.classList.remove("rotated");
    logoLabel.classList.remove("logo-moved");
    darkenLayer.classList.remove("bg-active");
    contentStartPage.classList.remove("pushed_down");
  }
});
