
// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <h2>${book.title || 'Unknown Title'}</h2>
            <p>by ${book.author || 'Unknown Author'}</p>
        `;
        bookList.appendChild(bookElement);
    });
}

// Fetch and load the JSON file
fetch('currentReads.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayBooks(data);
    })
    .catch(error => {
        console.error('Error loading the book data:', error);
        document.getElementById('book-list').innerHTML = '<p>Error loading books. Please try again later.</p>';
    });