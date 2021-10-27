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
  this.library = [
    {
      title: "Harry Potter",
      author: "JK Rowling",
      pages: "340",
      readStatus: true,
    },
  ];

  this.addBookToLibrary = function (book) {
    if (this.library.some((element) => element.title == book.title)) {
      alert("this book already exists");
    } else {
      this.library.push(book);
      ui.paint(this.library);
      alert("Book Added");
    }
  };

  this.removeBookFromLibrary = function (index) {
    let removed = this.library.splice(index, 1);
    ui.paint(this.library);
    alert(`Book ${removed[0].title} removed`);
  };

  this.changeReadStatus = function (index) {
    this.library[index].readStatus = !this.library[index].readStatus;
    ui.paint(this.library);
  };
}

const myLibrary = new Library();

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

window.addEventListener("DOMContentLoaded", function () {
  ui.paint(myLibrary.library);
});
