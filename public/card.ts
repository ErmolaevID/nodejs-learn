const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", event => {
    if (event.target.classList.contains("btn-remove")) {
      const id = event.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "delete"
      }).then(res => res.json())
        .then(card => {console.log(card)})
    }
  })
}