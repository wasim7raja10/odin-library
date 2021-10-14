const modal = document.querySelector('.add-book-modal');
const addBookBtn = document.querySelector('.add-book');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');

// add book modal 
function modalOpen() {
  modal.setAttribute("style", "display:flex")
  addBookBtn.setAttribute("style", "display:none")
}

function modalClose() {
  modal.setAttribute("style", "display: none")
  form.reset();
  addBookBtn.setAttribute("style", "display: block")
}

addBookBtn.addEventListener('click', modalOpen)
closeBtn.addEventListener('click', modalClose)

// book holder
let myLibrary = [];

// constructor
function Book(title, author, pageNum, isRead) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.isRead = isRead;
}

// function - adding book to library
function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(
    new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  )
  console.log(myLibrary)
  modalClose();
}

form.addEventListener('submit', addBookToLibrary);