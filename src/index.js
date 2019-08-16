"use strict";

document.addEventListener("DOMContentLoaded", () => {
  toggleCheckboxes();
  toggleCart();
  AddRemoveCart();
  filterAndSearch();
});

function toggleCheckboxes() {
  const checkboxes = document.querySelectorAll(".filter-check_checkbox");

  checkboxes.forEach(elem => {
    elem.addEventListener("change", function() {
      if (this.checked) {
        this.nextElementSibling.classList.add("checked");
      } else {
        this.nextElementSibling.classList.remove("checked");
      }
    });
  });
}

function toggleCart() {
  const cartBtn = document.querySelector("#cart");
  const modalCart = document.querySelector(".cart");
  const closeBtn = document.querySelector(".cart-close");

  cartBtn.addEventListener("click", () => {
    modalCart.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", () => {
    modalCart.style.display = "none";
    document.body.style.overflow = "";
  });
}

function AddRemoveCart() {
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

function filterAndSearch() {
  const cards = document.querySelectorAll(".goods .card");
  const discountCheckbox = document.querySelector("#discount-checkbox");
  const minPrice = document.querySelector("#min");
  const maxPrice = document.querySelector("#max");
  const search = document.querySelector(".search-wrapper_input");
  const searchBtn = document.querySelector(".search-btn button");

  discountCheckbox.addEventListener("input", () => {
    cards.forEach(card => {
      if (discountCheckbox.checked) {
        if (!card.querySelector(".card-sale")) {
          card.parentNode.style.display = "none";
        }
      } else {
        card.parentNode.style.display = "";
        filterPrice();
      }
    });
  });

  minPrice.addEventListener("change", filterPrice);
  maxPrice.addEventListener("change", filterPrice);

  function filterPrice() {
    cards.forEach(card => {
      const cardPrice = card.querySelector(".card-price");
      const price = parseFloat(cardPrice.textContent);

      if (minPrice.value < maxPrice.value) {
        if (
          (minPrice.value && price <= minPrice.value) ||
          (maxPrice.value && price >= maxPrice.value)
        ) {
          card.parentNode.style.display = "none";
        } else {
          card.parentNode.style.display = "";
        }
      }
    });
  }

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
