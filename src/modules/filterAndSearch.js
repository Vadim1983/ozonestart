import filter from "./filter";

export default function filterAndSearch() {
  const cards = document.querySelectorAll(".goods .card");
  const discountCheckbox = document.querySelector("#discount-checkbox");
  const minPrice = document.querySelector("#min");
  const maxPrice = document.querySelector("#max");
  const search = document.querySelector(".search-wrapper_input");
  const searchBtn = document.querySelector(".search-btn button");

  discountCheckbox.addEventListener("change", filter);
  minPrice.addEventListener("change", filter);
  maxPrice.addEventListener("change", filter);

  searchBtn.addEventListener("click", searching);
  search.addEventListener("keydown", searching);

  function searching(e) {
    if (e.keyCode === 13 || e.which === 1 || e.buttons === 1) {
      const searchText = new RegExp(search.value.trim(), "i");
      cards.forEach(card => {
        const cardTitle = card.querySelector(".card-title");
        if (!searchText.test(cardTitle.textContent)) {
          card.parentNode.style.display = "none";
        } else {
          card.parentNode.style.display = "";
        }
      });
      search.value = "";
    }
  }
}
