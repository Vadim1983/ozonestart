"use strict";

import getData from "./modules/getData";
import renderGoodsCards from "./modules/renderGoodsCards";
import renderCatalog from "./modules/renderCatalog";
import toggleCheckboxes from "./modules/toggleCheckboxes";
import toggleCart from "./modules/toggleCart";
import AddRemoveCart from "./modules/AddRemoveCart";
import filterAndSearch from "./modules/filterAndSearch";

(async function() {
  const db = await getData();
  renderGoodsCards(db);
  renderCatalog();
  toggleCheckboxes();
  toggleCart();
  AddRemoveCart();
  filterAndSearch();
})();
