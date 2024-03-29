export default function getData() {
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
