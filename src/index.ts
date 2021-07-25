import { renderHTML } from './app/app';
import { listeners } from './app/listeners/listeners';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  renderHTML();
  listeners();
});
