// Lots of comments added for my learning process

// Main array, it should start empty at the beginning of the page
const myLibrary = [];

// The constructor handles only the creation of book objects with all the data it should need
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false; // Not read by default
    this.bookID = crypto.randomUUID(); // BookID generated at it's creation
}

// This functions only adds books to the main array using the constructor Book
function addBook(title, author, pages) {
    return myLibrary.push(new Book(title, author, pages));
}

// This function only removes book, not only from the DOM but from the main array, so we don't get leftover data
function removeBook(bookID) {
    const index = myLibrary.findIndex(book => book.bookID === bookID);
    if (index !== -1) return myLibrary.splice(index, 1);
}

// Get the container for use in event delegation
const bookshelf = document.getElementById("books-container");

// Event delegation function
bookshelf.addEventListener("click", function(e) {
    const targetBtn = e.target;

    // Listener for the Read/Unread button
    if (targetBtn.classList.contains("btn-read-status")) {
        toggleReadUnreadDisplay(targetBtn);
    }
})

// Function that handles the toggle and change of text of the Read/Unread button
function toggleReadUnreadDisplay(targetBtn) {
    targetBtn.classList.toggle("btn-read-status-read");
    targetBtn.textContent = targetBtn.classList.contains("btn-read-status-read")
        ? "Read"
        : "Unread";
}