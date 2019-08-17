export default function toggleCart() {
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
