import "./components/cardsGame";
import "./components/cardsTrain";
import "./components/state";
import "./components/statistics";
import "./components/statisticsCards";

import { renderHeader } from "./views/renderHeader";
import { renderMain } from "./views/renderMain";
import { renderFooter } from "./views/renderFooter";

export const renderHTML = () => {
  renderHeader();
  renderMain();
  renderFooter();
}
