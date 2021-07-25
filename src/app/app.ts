import { renderHeader } from './views/renderHeader';
import { renderMain } from './views/renderMain';
import { renderFooter } from './views/renderFooter';

export const renderHTML: () => void = () => {
  renderHeader();
  renderMain();
  renderFooter();
};
