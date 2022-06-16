// book holder
let myLibrary;

const modal = document.querySelector(".add-book-modal");
const addBookBtn = document.querySelector(".add-book");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const table = document.querySelector("tbody");

if (localStorage.getItem("library")) {
  myLibrary = JSON.parse(localStorage.getItem("library"));
  displayLocalBook();
} else {
  myLibrary = [];
}
// add book modal
function modalOpen() {
  modal.setAttribute("style", "display:block");
}

function modalClose() {
  modal.setAttribute("style", "display: none");
  form.reset();
}

addBookBtn.addEventListener("click", modalOpen);
closeBtn.addEventListener("click", modalClose);

// constructor
function Book(title, author, pageNum, isRead) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.isRead = isRead;
}

// display locally saved book
function displayLocalBook() {
  let i = 0;
  myLibrary.forEach((book) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><button data-index="${i}" class="removeBtn">&times</button></td>
      <th scope='row'>${book.title}</th>
      <td>${book.author}</td>
      <td>${book.pageNum}</td>
      <td>
        <span>${book.isRead ? "Yes" : "No"} </span>
        <input data-index="${i}" type="checkbox" class="read" 
          ${book.isRead ? "checked" : ""}>
      </td>`;
    table.appendChild(newRow);
    i++;
  });
}

// display records
function display() {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><button data-index="${
      myLibrary.length - 1
    }" class="removeBtn">&times</button></td>
    <td>${myLibrary[myLibrary.length - 1].title}</td>
    <td>${myLibrary[myLibrary.length - 1].author}</td>
    <td>${myLibrary[myLibrary.length - 1].pageNum}</td>
    <td>
      <span>${myLibrary[myLibrary.length - 1].isRead ? "Yes" : "No"}</span>
      <input data-index="${
        myLibrary.length - 1
      }" type="checkbox" class="read" ${
    myLibrary[myLibrary.length - 1].isRead ? "checked" : ""
  }>
    </td>`;
  table.appendChild(newRow);
}

// function - adding book to library
function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(
    new Book(form[0].value, form[1].value, form[2].value, form[3].checked)
  );
  localStorage.setItem("library", JSON.stringify(myLibrary));
  modalClose();
  display();
}

// function - removing book from library
function removeBook(e) {
  if (e.target.classList.contains("removeBtn")) {
    e.target.parentElement.parentElement.remove();
    const index = +e.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    const removeBtn = document.querySelectorAll(".removeBtn");
    for (let i = 0; i < removeBtn.length; i++) {
      removeBtn[i].setAttribute("data-index", i);
    }
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
}

function readBook(e) {
  if (e.target.classList.contains("read")) {
    const index = +e.target.getAttribute("data-index");
    myLibrary[index].isRead = !myLibrary[index].isRead;
    e.target.previousElementSibling.innerText = `${
      myLibrary[index].isRead ? "Yes" : "No"
    }`;
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
}

form.addEventListener("submit", addBookToLibrary);
table.addEventListener("click", removeBook);
table.addEventListener("click", readBook);
