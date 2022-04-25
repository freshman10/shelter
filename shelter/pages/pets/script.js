"use strict";

//init
let petsData, pages1280px, pages768px, pages320px, pages;
const goFirstBtn = document.querySelector(".go-first");
const goPrevBtn = document.querySelector(".go-prev");
const activePageBtn = document.querySelector(".active");
const activePageBtnText = document.querySelector(".active p");
const goNextBtn = document.querySelector(".go-next");
const goLastBtn = document.querySelector(".go-last");
const paginationBtns = [
  goFirstBtn,
  goPrevBtn,
  activePageBtn,
  goNextBtn,
  goLastBtn,
];
let activePaginationPage = 0;
const petsCards = document.querySelectorAll(".card");
const petsImages = document.querySelectorAll(".card img");
const petsNames = document.querySelectorAll(".card p");
const burgerButton = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const logoLabel = document.querySelector(".logo");
const darkenLayer = document.querySelector(".darken-background");

const aboutTheShelterLink = document.querySelector(".about_shelter_link");
const helpTheShelterLink = document.querySelector(".help_link");
const contactsLink = document.querySelector(".contacts_link");
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
const disabledLinks = document.querySelectorAll(".disabled-links");
const ourPetsLink = document.querySelector(".our-pets-link");

// functions
fetch("../../assets/json/pets.json")
  .then((response) => response.json())
  .then((json) => (petsData = json));

function detectClickedPaginationBtn(e) {
  let target;
  if (!paginationBtns.includes(e.target)) {
    let path = (e.composedPath && e.composedPath()) || e.path;
    paginationBtns.forEach((btn) => {
      if (path.includes(btn)) {
        target = btn;
      }
    });
  } else {
    target = e.target;
  }
  return target;
}

function getRandomNumber(start = 0, end = 7) {
  return Math.floor(Math.random() * (end - start)) + start;
}

function getRandomEmptyPlace(arr) {
  let emptyPlaces = [];
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      emptyPlaces.push(i);
    }
  }
  return emptyPlaces[getRandomNumber(0, emptyPlaces.length)];
}

function createPages(elements) {
  let pages = [];
  for (let i = 0; i < 48; i += elements) {
    pages.push(Array.from(Array(elements)));
  }
  let i = 0,
    k = 0;

  while (i < 48) {
    let inputElement = petsData[k];
    let currentPage = Math.floor(i / elements);
    let insertIndex = getRandomEmptyPlace(pages[currentPage]);
    pages[currentPage][insertIndex] = inputElement;
    k++;
    i++;
    if (k === petsData.length) {
      k = 0;
    }
  }
  return pages;
}

function definePages() {
  pages1280px = createPages(8);
  pages768px = createPages(6);
  pages320px = createPages(3);
}

function updatePaginationCards(newCards) {
  for (let i = 0; i < newCards.length; i++) {
    petsImages[i].src = newCards[i].img;
    petsNames[i].innerHTML = newCards[i].name;
    petsCards[i].animate(
      [
        // keyframes
        { opacity: 0 },
        { opacity: 0.25 },
        { opacity: 0.5 },
        { opacity: 0.75 },
        { opacity: 1 },
      ],
      {
        // timing options
        duration: 500,
        iterations: 1,
      }
    );
  }
}

function setActiveBtn(number) {
  activePaginationPage = number;
  activePageBtnText.innerHTML = number + 1;
}

function adjustPage() {
  if (!pages1280px || !pages768px || !pages320px) {
    definePages();
  }
  if (window.innerWidth >= 1280) {
    pages = pages1280px;
  } else if (window.innerWidth < 768) {
    pages = pages320px;
  } else {
    pages = pages768px;
  }
}

function updatePaginationStyles() {
  if (activePaginationPage > 0) {
    goFirstBtn.classList.remove("disabled");
    goPrevBtn.classList.remove("disabled");
  } else if (activePaginationPage === 0) {
    goFirstBtn.classList.add("disabled");
    goPrevBtn.classList.add("disabled");
  }
  if (activePaginationPage + 1 === pages.length) {
    goLastBtn.classList.add("disabled");
    goNextBtn.classList.add("disabled");
  } else {
    goLastBtn.classList.remove("disabled");
    goNextBtn.classList.remove("disabled");
  }
}

function clickPaginationBtn(e) {
  let target = detectClickedPaginationBtn(e);
  adjustPage();
  switch (target) {
    case goFirstBtn:
      if (activePaginationPage > 0) {
        updatePaginationCards(pages[0]);
        setActiveBtn(0);
      }
      break;

    case goPrevBtn:
      if (activePaginationPage > 0) {
        updatePaginationCards(pages[activePaginationPage - 1]);
        setActiveBtn(activePaginationPage - 1);
      }
      break;

    case goNextBtn:
      if (pages.length > activePaginationPage + 1) {
        updatePaginationCards(pages[activePaginationPage + 1]);
        setActiveBtn(activePaginationPage + 1);
      }
      break;

    case goLastBtn:
      if (pages.length > activePaginationPage + 1) {
        updatePaginationCards(pages[pages.length - 1]);
        setActiveBtn(pages.length - 1);
      }
  }
  updatePaginationStyles();
}

function resetPagination() {
  adjustPage();
  setActiveBtn(0);
  updatePaginationCards(pages[activePaginationPage]);
  updatePaginationStyles();
  closeBurgerMenu();
}

function clickBurgerBtn(e) {
  if (e.target === modalWindow) {
    closeModal(e);
  }

  if (e.target === burgerButton || e.target.classList.contains("line")) {
    burgerMenu.classList.toggle("opened");
    burgerButton.classList.toggle("rotated");
    logoLabel.classList.toggle("logo-moved");
    darkenLayer.classList.toggle("bg-active");
    if (burgerMenu.classList.contains("opened")) {
      document.body.classList.add("scroll-disabled");
      burgerMenu.classList.add("scroll-enabled");
    } else {
      document.body.classList.remove("scroll-disabled");
      burgerMenu.classList.remove("scroll-enabled");
    }
  }
}

function closeBurgerMenu() {
  burgerMenu.classList.remove("opened");
  burgerButton.classList.remove("rotated");
  logoLabel.classList.remove("logo-moved");
  darkenLayer.classList.remove("bg-active");
  document.body.classList.remove("scroll-disabled");
  burgerMenu.classList.remove("scroll-enabled");
}

function openModal(e) {
  e.preventDefault();
  let path = (e.composedPath && e.composedPath()) || e.path;
  petCardsSlider.forEach((card) => {
    if (path.includes(card)) {
      petsData.forEach((pet) => {
        if (pet.name === card.childNodes[3].innerText) {
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
  if (!modalWindow.classList.contains("hide")) {
    document.body.classList.add("scroll-disabled");
    modalWindow.classList.add("scroll-enabled");
  } else {
    document.body.classList.remove("scroll-disabled");
    modalWindow.classList.remove("scroll-enabled");
  }
}

function closeModal(e) {
  e.preventDefault();
  modalWindow.classList.add("hide");
  document.body.classList.remove("scroll-disabled");
  modalWindow.classList.remove("scroll-enabled");
}

function menuScroll() {
  if (burgerMenu.classList.contains("opened")) {
    burgerButton.style.top = `${-burgerMenu.scrollTop}px`;
  }
}

// eventListners
paginationBtns.forEach((btn) => {
  btn.addEventListener("click", clickPaginationBtn);
});

window.addEventListener("resize", resetPagination, true);

window.addEventListener("click", clickBurgerBtn);
darkenLayer.addEventListener("click", closeBurgerMenu);
ourPetsLink.addEventListener("click", function (e) {
  scroll(0, 0);
  closeBurgerMenu();
});
disabledLinks.forEach((link) => {
  link.addEventListener("click", closeBurgerMenu);
});
petCardsSlider.forEach((card) => {
  card.addEventListener("click", openModal);
});
closeModalBtn.addEventListener("click", closeModal);
burgerMenu.addEventListener("scroll", menuScroll);
