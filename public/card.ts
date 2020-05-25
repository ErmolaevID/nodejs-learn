interface ICardElement {
  title: string;
  img: string;
  price: number;
  id: string;
  count?: number;
  length: number;
}

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", event => {
    if (event.target.classList.contains("btn-remove")) {
      const id = event.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "delete"
      }).then(res => res.json())
        .then(card => {
          let cardElement: Array<ICardElement> = card.courses;
          if (cardElement.length > 0) {
            const html = cardElement.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>${c.price}</td>
                <td><button data-id=${c.id} class="btn-remove">Delete</button></td>
              </tr>
              `
            }).join('')
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = card.price;
          } else {
            $card.innerHTML = "<p>Empty</p>"
          }
      })
    }
  })
}