import { menuCategories } from '../components/state';

export const renderMenu: () => string[] = () => menuCategories.map((c: string, i: number) => {
  if (i === 0) {
    return `
      <a href='#' class='burger-menu_link burger-menu_link_active' dataValue=${i - 1}>
        <li class='burger-menu_nav-title'>${c.toUpperCase()}</li>
      </a>
    `;
  }
  return `
      <a href='#' class='burger-menu_link' dataValue=${i - 1}>
        <li class='burger-menu_nav-title'>${c.toUpperCase()}</li>
      </a>
    `;
});

export const renderHeader: () => void = () => {
  const headerHtml = `
    <header class='header'>
      <h1 class='hidden-header'>English for kids</h1>
      <div class='burger-menu'>
        <a href='' class='burger-menu_button'>
          <span class='burger-menu_lines'></span>
        </a>
        <nav class='burger-menu_nav'>
          ${renderMenu().join().replace(/,/g, '')}
        </nav>
        <div class='burger-menu_overlay'></div>
      </div>
      <div class='toggleButton'>
        <label for='checkbox' class='switch'>
          <input type='checkbox' id='checkbox' checked>
          <span class='slider'></span>
          <span class='text'></span>
        </label>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHtml);
};
