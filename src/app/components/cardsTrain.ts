import { cardsItemsData } from "./state";
import { startRotate } from "../listeners/listeners";
import { categories } from "../cards";
import { CardContent } from "../models/cardContent";

export const renderTrainCards = (categoryNum: number = 0) => {
  const main = document.querySelector(".main");
  if (!main) throw new Error("error");
  main.innerHTML = "";
  const field = document.createElement('div');
  field.classList.add('cards-field');
  let selectedCardsCategory: CardContent[] | undefined = cardsItemsData.get(categories[categoryNum]);
  let arrayAudio: string[] = [];
  selectedCardsCategory?.map((c: CardContent, i: number) => {
    arrayAudio.push(c.audioSrc);
    field.insertAdjacentHTML("beforeend",
    `
      <div class="card-container card__rotate">
        <div class="card ">
          <div class="card__front ">
            <img src=./assets/${c.image} alt="${c.word} image">
            <div class="text-wrapper">
              <span class="word">${c.word}</span>
              <span class="rotate">
                <img class="rotate-img" src=./assets/images/circular.svg alt="${c.word} image">
              </span>
            </div>
          </div>
          <div class="card__back">
            <img src=./assets/${c.image} alt="${c.word} image">
            <div class="text-wrapper">
              <span class="word">${c.translation}</span>
            </div>
          </div>
        </div>
      </div>
    `);

    main?.append(field);
  });

  const playSound = (e: Event, i: number) => {
    const target = e.target as HTMLElement;
    if (!target.closest('rotate') && target.closest(".card__front")) {
      const audio = new Audio(`./assets/${arrayAudio[i]}`);
      audio.play();
    }
  };

  const getVoiceOfWord = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((c, i) => c.addEventListener('click', (e) => playSound(e, i)));
  };

  getVoiceOfWord();
  startRotate();
};