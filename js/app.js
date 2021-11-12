const modal = document.querySelector('.add-book-modal');
const addBookBtn = document.querySelector('.add-book');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
const table = document.querySelector('tbody');

// add book modal 
function modalOpen() {
  modal.setAttribute("style", "display:flex")
  addBookBtn.setAttribute("style", "display:none")
}

function modalClose() {
  modal.setAttribute("style", "display: none")
  // form.reset();  
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

// display records
function display() {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><button data-index="${myLibrary.length-1}" class="removeBtn">Remove</button></td>
    <td>${myLibrary[myLibrary.length-1].title}</td>
    <td>${myLibrary[myLibrary.length-1].author}</td>
    <td>${myLibrary[myLibrary.length-1].pageNum}</td>
    <td>${myLibrary[myLibrary.length-1].isRead ? "Yes" : "No"}</td>`
  table.appendChild(newRow);
}

// function - adding book to library
function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(
    new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  )
  console.log(myLibrary)
  modalClose();
  display();
}

// function - removing book from library
function removeBook(e) {
  e.target.parentElement.parentElement.remove();
  myLibrary.splice(+e.target.getAttribute("data-index"), 1);
  const removeBtn = document.querySelectorAll('.removeBtn');
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].setAttribute('data-index', i);
  }
}

form.addEventListener('submit', addBookToLibrary);
table.addEventListener('click', removeBook);