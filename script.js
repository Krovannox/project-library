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

    const bookCode = crypto.randomUUID();

    newBook["bookCode"] = bookCode;

    myLibrary.push(newBook);
}

/* Function that clears the book form */
function clearBookForm() {
    infoBookTitle.value = "";
    infoBookAuthor.value = "";
    infoBookPages.value = "";
}

/* Function that loops through the array of books */
function loopMyLibrary(myLibrary) {

    /* Clear the previous content with a while loop */
    while(bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }

    /* Iterate over the array and add the items to the page */
    for (let book of myLibrary) {
        /* Create book card */
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");

        for (let property in book) {
            if (property === "bookCode") continue; /* Avoid adding the bookCode to the display card */

            const displayBookTitle = document.createElement("span");
            displayBookTitle.setAttribute("class", "bookCardLabel");

            displayBookTitle.textContent = 
                (`${property.charAt(0).toUpperCase()}${property.slice(1)}:`);

            const displayBookTitleText = document.createElement("span");
            displayBookTitleText.setAttribute("class", "bookCardText");
            displayBookTitleText.textContent = book[property];

            

            bookCard.appendChild(displayBookTitle);
            bookCard.appendChild(displayBookTitleText);

            bookCard.setAttribute("data-bookCode", book.bookCode); /* Add the book code directly to the HTML element to link it for deletion */

            bookContainer.appendChild(bookCard);

            console.log(`${property}: ${book[property]}`);
        }

        /* Create button for book deletion */
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.id = book.bookCode;
        deleteButton.textContent = "Delete";
        bookCard.appendChild(deleteButton);

        /* Event listener to remove the book from the HTML and the Array */
        deleteButton.addEventListener("click", function(e) {
            bookCard.remove();

            const index = myLibrary.findIndex(removedBook => removedBook.bookCode === book.bookCode);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
        })
    }
}

/*************************************/
/* ELEMENTS TO PUT BOOK INFO IN HTML */
/*************************************/
const bookContainer = document.getElementById("book-container");


/* Create an event listener for the submit button of the form */
submitNewBookButton.addEventListener("click", function(e) {
    /* Prevents the default submit */
    e.preventDefault();

    /* Check if the inputs are filled */
    if (!infoBookTitle.value || !infoBookAuthor.value || !infoBookPages.value) {
        alert("Please fill all of the fields");
        return;
    }

    /* Assigns the values of the inputs */
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

    /* Loop the information and put it in the page */
    loopMyLibrary(myLibrary);

    /* Closes the dialog element */
    dialogElement.close();
});