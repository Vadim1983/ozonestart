"use strict";

getData().then(data => {
  renderGoodsCards(data);
  toggleCheckboxes();
  toggleCart();
  AddRemoveCart();
  filterAndSearch();
  renderCatalog();
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

  discountCheckbox.addEventListener("change", filter);
  minPrice.addEventListener("change", filter);
  maxPrice.addEventListener("change", filter);

  function filter() {
    const cards = document.querySelectorAll(".goods .card");
    const discountCheckbox = document.querySelector("#discount-checkbox");
    const minPrice = document.querySelector("#min");
    const maxPrice = document.querySelector("#max");

    cards.forEach(card => {
      const cardPrice = card.querySelector(".card-price");
      const price = parseFloat(cardPrice.textContent);
      const discount = card.querySelector(".card-sale");

      if (
        (minPrice.value && price <= minPrice.value) ||
        (maxPrice.value && price >= maxPrice.value)
      ) {
        card.parentNode.style.display = "none";
      } else if (discountCheckbox.checked && !discount) {
        card.parentNode.style.display = "none";
      } else {
        card.parentNode.style.display = "";
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

// Получение данных с сервера.

function getData() {
  const goodsWrapper = document.querySelector(".goods");
  return fetch("../db/db.json")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Данные не были получены, ошибка: ${response.status}`);
      }
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn(error);
      goodsWrapper.innerHTML =
        '<div style="color:red; font-size: 3rem; background-color: #cecece; margin: 0 auto;"><p>Упс, что-то пошло не так ;(</p></div>';
    });
}

function renderGoodsCards(data) {
  const goodsWrapper = document.querySelector(".goods");
  data.goods.forEach(good => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
    card.innerHTML = `
                <div class="card" data-category="${good.category}">
                ${good.sale ? `<div class="card-sale">🔥Hot Sale🔥</div>` : ``}
                  <div class="card-img-wrapper">
                    <span class="card-img-top"
                      style="background-image: url('${good.img}')"></span>
                  </div>
                  <div class="card-body justify-content-between">
                    <div class="card-price" style="${
                      good.sale ? "color:red" : ""
                    }">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                  </div>
                </div>
    `;
    goodsWrapper.appendChild(card);
  });
}

function renderCatalog() {
  const cards = document.querySelectorAll(".goods .card");
  const catalogList = document.querySelector(".catalog-list");
  const catalogWrapper = document.querySelector(".catalog");
  const catalogBtn = document.querySelector(".catalog-button");
  const categories = new Set();
  const discountCheckbox = document.querySelector("#discount-checkbox");

  cards.forEach(card => {
    categories.add(card.dataset.category);
  });

  categories.forEach(category => {
    const li = document.createElement("li");
    li.textContent = category;
    catalogList.appendChild(li);
  });

  catalogBtn.addEventListener("click", event => {
    if (catalogWrapper.style.display) {
      catalogWrapper.style.display = "";
    } else {
      catalogWrapper.style.display = "flex";
    }

    if (event.target.tagName === "LI") {
      cards.forEach(card => {
        const discount = card.querySelector(".card-sale");
        if (card.dataset.category !== event.target.textContent) {
          card.parentNode.style.display = "none";
        } else if (discountCheckbox.checked && !discount) {
          card.parentNode.style.display = "none";
        } else {
          card.parentNode.style.display = "";
        }
      });
    }
  });
}