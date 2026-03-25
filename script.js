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

////////////////////////////////////
// PROTOTYPE - CHANGE READ STATUS //
////////////////////////////////////

Book.prototype.changeReadStatus = function() {
    this.read = !this.read;
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

        // Form validation
        const form = document.querySelector("form");

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        addBook(bookTitle.value, bookAuthor.value, bookPages.value);
        clearFormInputs(dialogInputForm);
        closeDialog(targetFormBtn);

        renderBooks(myLibrary);
    }

    // Delegation for the "Close" button
    if (targetFormBtn.id === "btn-close-add-book-form") closeDialog(targetFormBtn);
})

/////////////////////////
// GET BOOKS CONTAINER //
/////////////////////////

const bookshelf = document.getElementById("books-container");

////////////////////////////////////////////////////////
// FUNCTION - VISUALLY TOGGLES THE READ STATUS BUTTON //
////////////////////////////////////////////////////////

function toggleReadUnreadDisplay(target) {
    target.classList.toggle("btn-read-status-read");
    target.textContent = target.classList.contains("btn-read-status-read")
        ? "Read"
        : "Unread";
}

////////////////////////////////////////////
// FUNCTION - CHANGE READ STATUS IN ARRAY //
////////////////////////////////////////////

function changeReadStatus(target) {
    //Get the bookCard related to the button pressed
    const bookCard = target.closest(".book-card");

    // Get the ID related to the bookCard
    const bookID = bookCard.dataset.id;

    // Get the book in the main array
    const bookToChangeReadStatus = myLibrary.find(book => book.bookID === bookID);

    // Call the prototype to change the status in the array
    if (bookToChangeReadStatus) {
        bookToChangeReadStatus.changeReadStatus();
    }
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

    const cardBtnContainer = document.createElement("div");
    cardBtnContainer.className = "card-btn-container";

    const btnReadUnread = document.createElement("button");
    if (book.read) {
        btnReadUnread.className = "btn-read-status btn-read-status-read";
        btnReadUnread.textContent = "Read";
    } else {
        btnReadUnread.className = "btn-read-status btn-read-status-unread";
        btnReadUnread.textContent = "Unread";
    }

    const btnRemoveBook = document.createElement("button");
    btnRemoveBook.className = "btn-remove-book";
    btnRemoveBook.textContent = "Remove Book";

    // Creates a dataset to add it to the DOM "data-id=ID"
    bookCard.dataset.id = book.bookID;

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `by ${book.author}`;
    bookPages.textContent = `${book.pages} pages`;

    // Appends the inputs to the bookCard
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);

    cardBtnContainer.appendChild(btnReadUnread);
    cardBtnContainer.appendChild(btnRemoveBook);
    bookCard.appendChild(cardBtnContainer);

    // Appends the bookCard to the Bookshelf
    bookshelf.appendChild(bookCard);
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
    const target = e.target;

    // Delegation for the Read/Unread button
    if (target.classList.contains("btn-read-status")) {
        toggleReadUnreadDisplay(target);
        changeReadStatus(target);
    }

    // Delegation for the Remove Book button
    if (target.classList.contains("btn-remove-book")) {
        // Traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector
        const bookCard = target.closest(".book-card");
        // Get the ID from the element previously found
        const bookID = bookCard.dataset.id;

        removeBook(bookID); // Remove the book from the main array
        renderBooks(myLibrary); // Reconstruct the bookshelf with the new modified main array
    }
})