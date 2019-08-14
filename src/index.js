'use strict';

const checkboxes = document.querySelectorAll('.filter-check_checkbox');

checkboxes.forEach((elem) => {
  elem.addEventListener('change', function () {
    if (this.checked) {
      this.nextElementSibling.classList.add('checked');
    }
    else {
      this.nextElementSibling.classList.remove('checked');
    }
  });
});

const cartBtn = document.querySelector('#cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

cartBtn.addEventListener('click', () => {
  modalCart.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', () => {
  modalCart.style.display = 'none';
  document.body.style.overflow = '';
});

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('#cart-empty');
const countGoods = document.querySelector('.counter');

cards.forEach((card) => {
  const btn = card.querySelector('button');
  btn.addEventListener('click', () => {
    const cloneCard = card.cloneNode(true);
    cartWrapper.appendChild(cloneCard);
    cartEmpty.remove();
    showData();
  });
});

function showData() {
  const cartCards = cartWrapper.querySelectorAll('.card');
  countGoods.textContent = cartCards.length;
}
