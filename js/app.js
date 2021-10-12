const modal = document.querySelector('.add-book-modal');
const addBookBtn = document.querySelector('.add-book');
const closeBtn = document.querySelector('.close');

function modalOpen() {
  modal.setAttribute("style", "display:flex")
  addBookBtn.setAttribute("style", "display:none")
}

function modalClose() {
  modal.setAttribute("style", "display: none")
  addBookBtn.setAttribute("style", "display: block")
}

addBookBtn.addEventListener('click', modalOpen)
closeBtn.addEventListener('click', modalClose)