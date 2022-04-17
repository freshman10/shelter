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
}

// eventListners
paginationBtns.forEach((btn) => {
  btn.addEventListener("click", clickPaginationBtn);
});

window.addEventListener("resize", resetPagination, true);
