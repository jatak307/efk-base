import { categories, cards } from '../cards';

export const renderCategoriesBlock = (parent: HTMLElement): void => {
  parent.innerHTML = '';
  const categoryCards: string[] = categories.map((c, i) => cards[i][0].image);
  categories.map((c: string, i: number) => parent?.insertAdjacentHTML('beforeend',
    ` <div class='category card__rotate' dataValue=${i}>
        <div class='category__top'></div>
        <div class='category__bottom'>
          <div class='category__icon'>
            <img src='./assets/${categoryCards[i]}' alt='category__icon__img' class='category__icon__img'>
          </div>
          <h3 class='category__description'>${c}</h3>
        </div>
      </div>`));
};

export const renderMain: () => void = () => {
  const root = document.getElementById('app') as HTMLDivElement;
  const main = document.querySelector('.main') as HTMLElement;
  if (main) {
    main.innerHTML = '';
    renderCategoriesBlock(main);
  } else {
    const section = document.createElement('section');
    section.classList.add('main');
    renderCategoriesBlock(section);
    root.append(section);
  }
};
