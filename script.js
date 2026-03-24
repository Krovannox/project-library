///////////////////
// LIBRARY ARRAY //
///////////////////

const myLibrary = [];

//////////////////////
// BOOK CONSTRUCTOR //
//////////////////////

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false; // Not read by default
    this.bookID = crypto.randomUUID(); // BookID generated at it's creation
}

/////////////////////////
// FUNCTION - ADD BOOK //
/////////////////////////

function addBook(title, author, pages) {
    return myLibrary.push(new Book(title, author, pages));
}

///////////////////////////
//FUNCTION - REMOVE BOOK //
///////////////////////////

function removeBook(bookID) {
    const index = myLibrary.findIndex(book => book.bookID === bookID);
    if (index !== -1) return myLibrary.splice(index, 1);
}

///////////////////////////////////
// GET DIALOG AND INPUT ELEMENTS //
///////////////////////////////////

const dialogInputForm = document.getElementById("dialog-container");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");

/////////////////////////////////////////
// FUNCTION - CLEAR DIALOG FORM INPUTS //
/////////////////////////////////////////

function clearFormInputs(dialogInputForm) {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}

//////////////////////////////////
// FUNCTION - CLOSE DIALOG FORM //
//////////////////////////////////

function closeDialog(targetFormBtn) {
    dialogInputForm.close();
}

///////////////////////////////////////////
// EVENT LISTENER FOR "+ADD BOOK" BUTTON //
///////////////////////////////////////////

const addBookBtn = document.getElementById("btn-add-book");

addBookBtn.addEventListener("click", function(e) {
    clearFormInputs(dialogInputForm); // Clears the form
    dialogInputForm.showModal(); // Open the form
})

//////////////////////////////////////////////
// EVENT LISTENER FOR DIALOG FORM CONTAINER //
//////////////////////////////////////////////

dialogInputForm.addEventListener("click", function(e) {
    const targetFormBtn = e.target;

    // Delegation for the "Submit" button
    if (targetFormBtn.id === "btn-submit-add-book-form") {
        e.preventDefault();
        
        addBook(bookTitle.value, bookAuthor.value, bookPages.value);
        clearFormInputs(dialogInputForm);
        closeDialog(targetFormBtn);

        renderBooks(myLibrary);
    }

    // Delegation for the "Close" button
    if (targetFormBtn.id === "btn-close-add-book-form") closeDialog(targetFormBtn);
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ORDER PENDING//

/////////////////////////
// GET BOOKS CONTAINER //
/////////////////////////

const bookshelf = document.getElementById("books-container");

////////////////////////////////////////////////////////
// FUNCTION - VISUALLY TOGGLES THE READ STATUS BUTTON //
////////////////////////////////////////////////////////

function toggleReadUnreadDisplay(targetBookshelfBtn) {
    targetBookshelfBtn.classList.toggle("btn-read-status-read");
    targetBookshelfBtn.textContent = targetBookshelfBtn.classList.contains("btn-read-status-read")
        ? "Read"
        : "Unread";
}

/////////////////////////////////
// FUNCTION - CREATE BOOK CARD //
/////////////////////////////////

function createBookCard(book) {
    // Create elements and asign them classes
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const bookTitle = document.createElement("span");
    bookTitle.className = "book-title";

    const bookAuthor = document.createElement("span");
    bookAuthor.className = "book-author";

    const bookPages = document.createElement("span");
    bookPages.className = "book-pages";

    const btnReadUnread = document.createElement("button");
    btnReadUnread.className = "btn-read-status btn-read-status-unread";
    btnReadUnread.textContent = "Unread";

    const btnRemoveBook = document.createElement("button");
    btnRemoveBook.className = "btn-remove-book";
    btnRemoveBook.textContent = "Remove Book";

    for (let property in book) {
        // Avoid adding "read" and "bookID" to the display
        if (property === "read") continue;
        if (property === "bookID") continue;

        // Asigns the value per property
        if (property === "title") {
            bookTitle.textContent = book[property];
            console.log(bookTitle);
        } else if (property === "author") {
            bookAuthor.textContent = `by ${book[property]}`;
            console.log(bookAuthor);
        } else if (property === "pages") {
            bookPages.textContent = `${book[property]} pages`;
            console.log(bookPages);
        }

        // Appends the inputs to the bookCard
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(btnReadUnread);
        bookCard.appendChild(btnRemoveBook);

        // Appends the bookCard to the Bookshelf
        bookshelf.appendChild(bookCard);
    }
}

//////////////////////////////////////////////////////////////////////
// FUNCTION - RENDERS THE BOOKS IN THE ARRAY TO THE BOOKS CONTAINER //
//////////////////////////////////////////////////////////////////////

function renderBooks(myLibrary) {
    bookshelf.textContent = "";
    
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

//////////////////////////////////////////////
// EVENT DELEGATION FOR THE BOOKS CONTAINER //
//////////////////////////////////////////////

bookshelf.addEventListener("click", function(e) {
    const targetBookshelfBtn = e.target;

    // Delegation for the Read/Unread button
    if (targetBookshelfBtn.classList.contains("btn-read-status")) toggleReadUnreadDisplay(targetBookshelfBtn)
})