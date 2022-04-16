"use strict";

//init
const burgerButton = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const logoLabel = document.querySelector(".logo");
const darkenLayer = document.querySelector(".darken-background");
const contentStartPage = document.querySelector(".content");
const aboutTheShelterLink = document.querySelector(".about_shelter_link");
const helpTheShelterLink = document.querySelector(".help_link");
const contactsLink = document.querySelector(".contacts_link");
let petsData;
const leftBtnSlider = document.querySelector(".left-btn");
const rightBtnSlider = document.querySelector(".right-btn");
const petCardsSlider = document.querySelectorAll(".card");
const closeModalBtn = document.querySelector(".modal-close-btn");
const modalWindow = document.querySelector(".modal-window");
const petsName = document.querySelector(".pets-name");
const petsBreed = document.querySelector(".pets-breed");
const petsDescription = document.querySelector(".pets-description");
const petsAge = document.querySelector(".pets-age");
const petsInoculations = document.querySelector(".pets-inoculations");
const petdiseases = document.querySelector(".pets-diseases");
const petsparasites = document.querySelector(".pets-parasites");
const petsImage = document.querySelector(".pets-image");

//functions
function clickBurgerBtn(e) {
  if (e.target === modalWindow) {
    modalWindow.classList.add("hide");
  }

  if (e.target === burgerButton || e.target.classList.contains("line")) {
    burgerMenu.classList.toggle("opened");
    burgerButton.classList.toggle("rotated");
    logoLabel.classList.toggle("logo-moved");
    darkenLayer.classList.toggle("bg-active");
    contentStartPage.classList.toggle("pushed_down");
  }
}

function closeBurgerMenu() {
  burgerMenu.classList.remove("opened");
  burgerButton.classList.remove("rotated");
  logoLabel.classList.remove("logo-moved");
  darkenLayer.classList.remove("bg-active");
  contentStartPage.classList.remove("pushed_down");
}

function isVisible(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

function getRandomNumber(upTo) {
  return Math.floor(Math.random() * upTo);
}

function getVisibleElements(arr) {
  let activeElemetns = [];
  arr.forEach((el) => {
    if (isVisible(el)) {
      activeElemetns.push(el);
    }
  });
  return activeElemetns;
}

function getNames(arr) {
  let names = [];
}

fetch("../../assets/json/pets.json")
  .then((response) => response.json())
  .then((json) => (petsData = json));

function clickSliderBtn(e) {
  let activeCards = getVisibleElements(petCardsSlider);
  let activeNames = activeCards.map((el) => {
    el.classList.remove(el.childNodes[3].innerText);
    return el.childNodes[3].innerText;
  });

  activeCards.forEach((card) => {
    let randomNumber = getRandomNumber(petsData.length);
    while (true) {
      if (activeNames.includes(petsData[randomNumber].name)) {
        randomNumber = getRandomNumber(petsData.length);
      } else {
        activeNames.push(petsData[randomNumber].name);
        card.childNodes[1].src = petsData[randomNumber].img;
        card.childNodes[3].innerText = petsData[randomNumber].name;
        card.classList.add(petsData[randomNumber].name);
        break;
      }
    }
  });
}

function openModal(e) {
  e.preventDefault();
  let path = (e.composedPath && e.composedPath()) || e.path;
  petCardsSlider.forEach((card) => {
    if (path.includes(card)) {
      petsData.forEach((pet) => {
        if (pet.name === card.childNodes[3].innerText) {
          console.log(pet);
          petsName.innerHTML = pet.name;
          petsBreed.innerHTML = `${pet.type} - ${pet.breed}`;
          petsDescription.innerHTML = pet.description;
          petsImage.src = pet.img;
          petsAge.innerHTML = `<b>Age:</b> ${pet.age}`;
          petsInoculations.innerHTML = `<b>Inoculations:</b> ${pet.inoculations.join(
            ", "
          )}`;
          petdiseases.innerHTML = `<b>Diseases:</b> ${pet.diseases.join(", ")}`;
          petsparasites.innerHTML = `<b>Parasites:</b> ${pet.parasites.join(
            ", "
          )}`;
        }
      });
    }
  });
  modalWindow.classList.remove("hide");
}

function closeModal(e) {
  e.preventDefault();
  modalWindow.classList.add("hide");
}

// Event listners
window.addEventListener("click", clickBurgerBtn);
window.addEventListener("resize", function (e) {
  if (!window.matchMedia("(min-width: 768px)")) {
    closeBurgerMenu();
  }
});
darkenLayer.addEventListener("click", closeBurgerMenu);
aboutTheShelterLink.addEventListener("click", closeBurgerMenu);
helpTheShelterLink.addEventListener("click", closeBurgerMenu);
contactsLink.addEventListener("click", closeBurgerMenu);
[leftBtnSlider, rightBtnSlider].forEach((el) =>
  el.addEventListener("click", clickSliderBtn)
);

petCardsSlider.forEach((card) => {
  card.addEventListener("click", openModal);
});
closeModalBtn.addEventListener("click", closeModal);
