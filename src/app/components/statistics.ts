import { statisticsCard } from './statisticsCards';
import { StatisticsCardType } from '../models/statisticsCardType';

export const renderStatisticsBlock: () => void = () => {
  const main = document.querySelector('.main');
  if (!main) throw new Error('error');
  main.innerHTML = `
  <table class='table'>
    <tr class='table-header'>
    </tr>
  </table>`;

  const table = document.querySelector('.table');
  const tableHeader = document.querySelector('.table-header');
  const tableHeaders: string[] = ['Categories', 'Words', 'Translation', 'Train Mode', 'Correct', 'Errors', 'Errors,%'];
  tableHeaders.map((el) => tableHeader?.insertAdjacentHTML('beforeend',
    `<th class='table-item table-header__item'>${el}</th>`));

  statisticsCard.forEach((category: StatisticsCardType[]) => {
    category.map((item: StatisticsCardType) => table?.insertAdjacentHTML('beforeend',
      `
        <tr class='table-body'>
            <td class='table-item table-body__item'>${item.category}</td>
            <td class='table-item table-body__item'>${item.word}</td>
            <td class='table-item table-body__item'>${item.translation}</td>
            <td class='table-item table-body__item'>${item.trainMode}</td>
            <td class='table-item table-body__item'>${item.correct}</td>
            <td class='table-item table-body__item'>${item.errors}</td>
            <td class='table-item table-body__item'>${item.errorsPercent}</td>
        </tr>
      `));
  });
};
