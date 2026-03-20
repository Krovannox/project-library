/* const addBookForm = document.getElementById("addBookForm");

function createBookForm() {
    const formElement = document.createElement("form");
    formElement.setAttribute("method", "get");
    formElement.setAttribute("action", "#");
    formElement.setAttribute("class", "form-new-book");
    
    const bookTitleLabel = document.createElement("label");
    bookTitleLabel.setAttribute("class", "form-label");
    bookTitleLabel.setAttribute("for", "book_title");
    bookTitleLabel.textContent = "Book title:"

    const bookTitleInput = document.createElement("input");
    bookTitleInput.setAttribute("class", "form-input");
    bookTitleInput.type = "text";
    bookTitleInput.name = "book_title";
    bookTitleInput.id = "book_title";

    const bookAuthorLabel = document.createElement("label");
    bookAuthorLabel.setAttribute("class", "form-label");
    bookAuthorLabel.setAttribute("for", "book_author");
    bookAuthorLabel.textContent = "Book author:"

    const bookAuthorInput = document.createElement("input");
    bookAuthorInput.setAttribute("class", "form-input");
    bookAuthorInput.type = "text";
    bookAuthorInput.name = "book_author";
    bookAuthorInput.id = "book_author";

    const bookPagesLabel = document.createElement("label");
    bookPagesLabel.setAttribute("class", "form-label");
    bookPagesLabel.setAttribute("for", "book_pages");
    bookPagesLabel.textContent = "Book pages:"

    const bookPagesInput = document.createElement("input");
    bookPagesInput.setAttribute("class", "form-input");
    bookPagesInput.type = "text";
    bookPagesInput.name = "book_pages";
    bookPagesInput.id = "book_pages";

    const submitButton = document.createElement("button");
    submitButton.setAttribute("class", "form-button");
    submitButton.setAttribute("id", "formButton");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    formElement.appendChild(bookTitleLabel);
    formElement.appendChild(bookTitleInput);
    formElement.appendChild(bookAuthorLabel);
    formElement.appendChild(bookAuthorInput);
    formElement.appendChild(bookPagesLabel);
    formElement.appendChild(bookPagesInput);
    formElement.appendChild(submitButton);

    document.body.appendChild(formElement);

    const submitBookButton = document.getElementById("formButton");
    submitBookButton.addEventListener("click", function(e) {
    console.log("Submit button");
})
}

addBookForm.addEventListener("click", function(e) {
    createBookForm();
})
 */


/* Code that work at adding books, needs testing and configuration:

const bookName = document.getElementById("formBookName");
const bookAuthor = document.getElementById("formBookAuthor");
const bookPages = document.getElementById("formBookPages");

const bookSubmitButton = document.getElementById("formButton");

const myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

function addNewBook() {
    const newBook = new Book(bookName.value, bookAuthor.value, bookPages.value);
    myLibrary.push(newBook);
}

bookSubmitButton.addEventListener("click", function(e) {
    addNewBook();

    return console.log(myLibrary);
})

*/