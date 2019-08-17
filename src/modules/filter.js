export default function filter() {
  const cards = document.querySelectorAll(".goods .card");
  const discountCheckbox = document.querySelector("#discount-checkbox");
  const minPrice = document.querySelector("#min");
  const maxPrice = document.querySelector("#max");
  const activeLi = document.querySelector(".catalog-list li.active");

  cards.forEach(card => {
    const cardPrice = card.querySelector(".card-price");
    const price = parseFloat(cardPrice.textContent);
    const discount = card.querySelector(".card-sale");
    card.parentNode.style.display = "";

    if (
      (minPrice.value && price <= minPrice.value) ||
      (maxPrice.value && price >= maxPrice.value)
    ) {
      card.parentNode.style.display = "none";
    } else if (discountCheckbox.checked && !discount) {
      card.parentNode.style.display = "none";
    } else if (activeLi) {
      if (card.dataset.category !== activeLi.textContent) {
        card.parentNode.style.display = "none";
      }
    }
  });
}
