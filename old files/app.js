const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("readStatus");
const submit = document.getElementById("submit");
const bookGrid = document.getElementById("bookGrid");
// const book = document.querySelector(".book");

const ui = new UI();

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function Library() {
  this.library = [];

  this.addBookToLibrary = function (book) {
    let ls = JSON.parse(localStorage.getItem("myLibrary"));
    if (
      this.library.some((element) => element.title == book.title) ||
      ls.some((element) => element.title == book.title)
    ) {
      alert("this book already exists");
    } else {
      this.library.push(book);
      // ls = JSON.parse(localStorage.getItem("myLibrary"));
      localStorage.setItem("myLibrary", JSON.stringify(this.library));
      ui.paint(this.library);
      alert("Book Added");
    }
  };

  this.removeBookFromLibrary = function (index) {
    let removed = this.library.splice(index, 1);
    localStorage.setItem("myLibrary", JSON.stringify(this.library));
    ui.paint(this.library);
    alert(`Book ${removed[0].title} removed`);
  };

  this.changeReadStatus = function (index) {
    this.library[index].readStatus = !this.library[index].readStatus;
    localStorage.setItem("myLibrary", JSON.stringify(this.library));
    ui.paint(this.library);
  };
}

const myLibrary = new Library();

window.addEventListener("DOMContentLoaded", function () {
  let ls = JSON.parse(localStorage.getItem("myLibrary"));
  if (ls === null) {
    localStorage.setItem("myLibrary", JSON.stringify([]));
    ls = JSON.parse(localStorage.getItem("myLibrary"));
  }
  myLibrary.library = ls;
  ui.paint(myLibrary.library);
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let book = new Book(
    title.value,
    author.value,
    pages.value,
    readStatus.checked
  );
  myLibrary.addBookToLibrary(book);
  console.log(myLibrary.library);
});

bookGrid.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let index = e.target.parentElement.getAttribute("data-index");
    myLibrary.removeBookFromLibrary(index);
    console.log(myLibrary.library);
  }

  if (e.target.classList.contains("isRead")) {
    let index = e.target.parentElement.parentElement.getAttribute("data-index");
    myLibrary.changeReadStatus(index);
  }
});
