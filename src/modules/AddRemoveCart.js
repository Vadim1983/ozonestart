export default function AddRemoveCart() {
  const cards = document.querySelectorAll(".goods .card");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartEmpty = document.querySelector("#cart-empty");
  const countGoods = document.querySelector(".counter");

  cards.forEach(card => {
    const btn = card.querySelector("button");

    btn.addEventListener("click", () => {
      const cloneCard = card.cloneNode(true);
      cartWrapper.appendChild(cloneCard);
      showData();

      const removeBtn = cloneCard.querySelector(".btn");
      removeBtn.textContent = "Удалить из корзины";
      removeBtn.addEventListener("click", () => {
        cloneCard.remove();
        showData();
      });
    });
  });

  function showData() {
    const cartCards = cartWrapper.querySelectorAll(".card");
    const cardsPrice = cartWrapper.querySelectorAll(".card-price");
    const cardTotal = document.querySelector(".cart-total span");

    let sum = 0;
    cardsPrice.forEach(cardPrice => {
      let price = parseFloat(cardPrice.textContent);
      sum += price;
    });

    countGoods.textContent = cartCards.length;
    cardTotal.textContent = sum;

    if (cartCards.length !== 0) {
      cartEmpty.style.display = "none";
    } else {
      cartEmpty.style.display = "flex";
    }
  }
}
