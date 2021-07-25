import { cardsItemsData } from "./state";
import { renderMain } from "../views/renderMain";
import { CardContent } from "../models/cardContent";
import { categories, cards } from "../cards";

export const renderGameCards = (categoryNum: number) => {
  const main = document.querySelector(".main") as HTMLElement;
  if (!main) throw new Error("error");
  main.innerHTML = "";
  renderGameField(main, categoryNum);

  const btn = document.querySelector(".start-game");
  let cardsForGame = cards.slice()[categoryNum].filter((d: CardContent) => d);
  
  cardsForGame = cardsForGame.sort(() => Math.random() - 0.5);
  let mistakeCounter = 0;
  let newGameStatus = false;

  const deleteFirstItemFromArray = () => {
    cardsForGame.shift();
  };

  const rerenderBtn = () => {
    if (!btn) return;
    btn.innerHTML = "<img src='assets/images/repeat.svg' class='repeating'/>";
  };

  const countMistake = () => {
    mistakeCounter += 1;
  };

  const voiceTheWord = () => {
    if (cardsForGame.length === 0) {
      finishedGame(main, mistakeCounter, newGameStatus);
      return;
    }
    const audio = new Audio(`./assets/${cardsForGame[0].audioSrc}`);
    audio.play();
  };

  const startGameInGameMOde = (e: Event) => {
    const target = e.target as Element;
    let imgSrc = "";
    if (!target) return;
    if (target.classList.contains("game__card-img-item")) {      
      const targetAttr = target.getAttribute("src");
      if (targetAttr) imgSrc = targetAttr.replace("./assets/", "");
      if (imgSrc !== cardsForGame[0].image) {
        playSoundFunc("error.mp3");
        addStarAnswer("star.svg");
        countMistake();
      }
      if (imgSrc === cardsForGame[0].image) {
        playSoundFunc("correct.mp3");
        deleteFirstItemFromArray();
        setTimeout(() => {
          voiceTheWord();
        }, 1300);
        target.closest('.card-container')?.classList.add('disabled-card');      
        addStarAnswer("star-win.svg");
      }
    }
  };

  const protection = (e: Event) => {
    const target = e.target as Element;
    if (!target.classList.contains("header")) {
      newGameStatus = false;
    }
  };

  const buttonClickHandler = () => {
    voiceTheWord();
    rerenderBtn();
    newGameStatus = true;
  };

  const checkGameStatus = (e: Event) => {
    if (newGameStatus) {
      startGameInGameMOde(e);
    }
  };

  btn?.addEventListener("click", buttonClickHandler);
  main.addEventListener("click", checkGameStatus);
  const header = document.querySelector("header");
  header?.addEventListener("click", protection);
};

const renderGameField = (main: HTMLElement, categoryNum: number) => {
  const field = document.createElement('div');
  field.classList.add('cards-field');
  field.innerHTML = "";
  let selectedCardsCategory = cardsItemsData.get(categories[categoryNum]);
  selectedCardsCategory?.map((c: CardContent, i: number) => field.insertAdjacentHTML("beforeend",
    `<div class="card-container card__rotate">
      <div class="card ">
        <div class="card__front ">
          <img src=./assets/${c.image} alt="${c.word}" class="card__img-item game__card-img-item">
        </div>
      </div>
    </div>`   
  ));
  main?.append(field);
  main.insertAdjacentHTML("afterbegin", "<div class=\"game__status\"></div>");
  field.insertAdjacentHTML("afterend", "<button class='start-game'>start</button>");
}

const playSoundFunc = (soundName: string) => {
  const audio = new Audio(`assets/audio/${soundName}`);
  audio.play();
};

const addStarAnswer = (imgName: string) => {
  const gameStatus = document.querySelector(".game__status");
  const gameStatusMaxValueChild = 18;
  if (!gameStatus) return;
  if (gameStatus.childElementCount === gameStatusMaxValueChild) {
    gameStatus.removeChild(gameStatus.childNodes[0]);
  }
  gameStatus.insertAdjacentHTML("beforeend",
    `<img src=assets/images/${imgName} class=game__status-item>`);
};

const finishedGame = (main: HTMLElement, mistakes: number, status: boolean) => {
  if (!main) return;
  if (mistakes === 0) {
    playSoundFunc("success.mp3");
    main.innerHTML = "<img src='./assets/images/you-win.jfif' class='wiseOwl'>";
    mistakes = 0;
    setTimeout(() => {
      renderMain();
    }, 5000);
  }
  if (mistakes > 0) {
    playSoundFunc("failure.mp3");
    main.innerHTML = `<img src='./assets/images/you-lost.jfif' class='wiseOwl'>
      <h3 class="game-over">You made ${mistakes} mistakes</h3>`;
    mistakes = 0;
    setTimeout(() => {
      renderMain();
    }, 5000);
  }
  status = false;
};