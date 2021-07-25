import { renderMain } from "../views/renderMain";
import { renderGameCards } from "../components/cardsGame";
import { renderTrainCards } from "../components/cardsTrain";
import { getCategoryValue, menuCategories } from "../components/state";
import { buttonValue, categoryValue, setButtonValue } from '../components/state';
import { renderStatisticsBlock } from "../components/statistics";

let attributeFromCategoryCard: number = 0;
let attributeFromBurgerItem: number = 0;

export const listeners: () => void = () => {
  const main = document.querySelector(".main");
  const burgerMenu = document.querySelector(".burger-menu");
  const switchButton = document.querySelector(".switch");

  main?.addEventListener("click", getAttributeFromCategoryCard);
  main?.addEventListener("click", renderSelectedCategory);
  main?.addEventListener("click", changeMode);
  burgerMenu?.addEventListener("click", getMenuAttribute);
  burgerMenu?.addEventListener("click", menuHandler);
  burgerMenu?.addEventListener("click", (e) => toggleModal(e, burgerMenu));
  switchButton?.addEventListener('change', changeModeCards);
};

export const getAttributeFromCategoryCard = (e: Event): void => {
  const target = e.target as Element;
  const targetCategory = target.closest(".category");
  if (targetCategory) {
    const targetCategoryValue = targetCategory.getAttribute("dataValue");
    if (targetCategoryValue) attributeFromCategoryCard = + targetCategoryValue;
    getCategoryValue(attributeFromCategoryCard);    
  }
};

const changeMode = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.closest(".category")) {
    if (buttonValue) {
      renderTrainCards(categoryValue);
    } else {
      renderGameCards(categoryValue);
    }
  }
};

const toggleModal = (e: Event, burgerMenu: Element) => {
  e.preventDefault();
  const target = e.target as Element;
  if (target.closest(".burger-menu_link")
    || target.closest(".burger-menu_button")
    || target.classList.contains("burger-menu_overlay")) {
    burgerMenu?.classList.toggle("burger-menu_active");
  }
  if (burgerMenu?.classList.contains("burger-menu_active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
};

export const makeActiveLinks = (i: number, ) => {
  const burgerMenuLink = document.querySelectorAll(".burger-menu_link");
  for (let j = 0; j < menuCategories.length; j += 1) {
    burgerMenuLink[j].classList.remove("burger-menu_link_active");
  }
  burgerMenuLink[i].classList.add("burger-menu_link_active");
};

export const chooseCategory = (i: number, e: Event): void  => {
  const target = e.target as Element;
  if (target.closest(".burger-menu_link") && !target.closest(".burger-menu_button")) {
    if (i === 0) {
      renderMain();
    }
    if (i > 0 && i < 9) {
      if (buttonValue) {
        renderTrainCards(categoryValue);
      } else {
        renderGameCards(categoryValue);
      }
    }
    if (i === 9) {
      renderStatisticsBlock();
    }
    makeActiveLinks(i);
  }
};

export const renderSelectedCategory = (e: Event): void => {
  const target = e.target as Element;
  const targetCategory = target.closest(".category");
  if (targetCategory) {
    const targetCategoryValue = Number(targetCategory.getAttribute("dataValue"));
    if (buttonValue) {
      renderTrainCards(targetCategoryValue);
    } else {
      renderGameCards(targetCategoryValue);
    }
  }
};

const getMenuAttribute = (e: Event): void  => {
  const target = e.target as Element;
  if (target.closest(".burger-menu_link") && !target.closest(".burger-menu_button")) {
    const targetLink = target.closest(".burger-menu_link");
    const targetDataValue = targetLink?.getAttribute("dataValue");
    
    if (targetDataValue) attributeFromBurgerItem = + targetDataValue;
    getCategoryValue(attributeFromBurgerItem);
  }
};

const menuHandler = (e: Event): void  => {
  chooseCategory(Number(categoryValue) + 1, e);
};

export const changeColorCategory = () => {
  const categoryTop = document.querySelectorAll(".category__top");
  categoryTop.forEach(el => {
    el.classList.toggle("category-top--gameMod");
  });
};

export const changeModeCards = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    setButtonValue(true);
    changeColorCategory();
    if (categoryValue !== null && categoryValue >= 0) {
      renderTrainCards(categoryValue);
    }
  }
  if (!target.checked) {
    setButtonValue(false);
    changeColorCategory();
    if (categoryValue !== null && categoryValue >= 0) {
      renderGameCards(categoryValue);
    }
  }
};

export const startRotate = () => {
  const cardRotate = document.querySelectorAll(".rotate");
  const cardContainer = document.querySelectorAll('.card-container');
  
  [...cardContainer].map((elem, i) => {
    rotateCard(elem);
    rotateCardBack(elem);
    cardRotate[i].addEventListener("click", () => rotateCard(elem));
    cardContainer[i].addEventListener("mouseleave", () => rotateCardBack(elem));
  });
};

const rotateCard = (elem: Element) => {
  elem.classList.toggle('flipped');
};

const rotateCardBack = (elem: Element) => {
  if (elem.classList.contains("flipped")) {
    rotateCard(elem);
  }
};
