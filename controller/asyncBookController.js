const books = require('../booksData.json');

exports.getAllBooks = (req, res) => {
  // Simulate asynchronous operation
  setTimeout(() => {
    res.json({ books });
  }, 1000);
};

exports.searchByISBN = (req, res) => {
  const isbn = parseInt(req.params.isbn);

  // Simulate asynchronous operation with a Promise
  const searchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books.find(book => book.isbn === isbn);
      if (book) {
        resolve(book);
      } else {
        reject('Book not found');
      }
    }, 1000);
  });

  searchPromise
    .then(book => {
      res.json(book);
    })
    .catch(error => {
      res.status(404).json({ error });
    });
};

exports.searchByAuthor = (req, res) => {
  const author = req.params.author;

  const authorBooks = books.filter(
    book => book.author.toLowerCase() === author.toLowerCase()
  );

  if (authorBooks.length > 0) {
    res.json(authorBooks);
  } else {
    res.status(404).json({ error: 'No books found by this author' });
  }
};

exports.searchByTitle = (req, res) => {
  const title = req.params.title;

  const titleBooks = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  if (titleBooks.length > 0) {
    res.json(titleBooks);
  } else {
    res.status(404).json({ error: 'No books found with this title' });
  }
};
