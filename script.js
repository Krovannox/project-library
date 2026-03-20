/* Selects the submit button inside the form of the dialog */
const submitNewBookButton = document.getElementById("submit-book-btn");

/* Selects the form */
const mainBookForm = document.getElementById("main-book-form");

/* Selects the dialog element */
const dialogElement = document.getElementById("new-book-form");

/* Selects the information of the inputs */
const infoBookTitle = document.getElementById("bookTitle");
const infoBookAuthor = document.getElementById("bookAuthor");
const infoBookPages = document.getElementById("bookPages");

/* Array to hold the books */
const myLibrary = [];

/* Constructor */
function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

/* Function that adds new books to the array */
function addNewBook(bookTitle, bookAuthor, bookPages) {
    const newBook = new Book(bookTitle, bookAuthor, bookPages);

    myLibrary.push(newBook);
}

/* Function that clears the book form */
function clearBookForm() {
    infoBookTitle.value = "";
    infoBookAuthor.value = "";
    infoBookPages.value = "";
}

/* Create an event listener for the submit button of the form */
submitNewBookButton.addEventListener("click", function(e) {
    /* Prevents the default submit */
    e.preventDefault();

    /* Check if the inputs are filled */
    if (!infoBookTitle.value || !infoBookAuthor.value || !infoBookPages.value) {
        alert("Please fill all of the fields");
        return;
    }

    /* Asigns the values of the inputs */
    const bookTitle = infoBookTitle.value;
    const bookAuthor = infoBookAuthor.value;
    const bookPages = infoBookPages.value;

    /* Add the book to the array */
    addNewBook(bookTitle, bookAuthor, bookPages);

    console.log(bookTitle);
    console.log(bookAuthor);
    console.log(bookPages);

    console.log(myLibrary);

    /* Empty the form inputs */
    clearBookForm();

    /* Closes the dialog element */
    dialogElement.close();
});

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