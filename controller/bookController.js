const books = require('../booksData.json');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
// Task 1: Get the book list available in the shop

exports.getBooks = (req, res) => {
  res.json({ books_list: books });
};

// Task 2: Get the books based on ISBN

exports.getBooksByISBN = (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const book = books.find(book => book.isbn === isbn);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};

// Task 3: Get all books by Author

exports.getBookByAuthor = (req, res) => {
  const author = req.params.author;
  const authorBooks = books.filter(book => book.author === author);
  if (authorBooks.length > 0) {
    res.json(authorBooks);
  } else {
    res.status(404).json({ error: 'No books found for the author' });
  }
};

// Task 4: Get all books based on Title

exports.getBookByTitle = (req, res) => {
  const title = req.params.title;
  const titleBooks = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  if (titleBooks.length > 0) {
    res.json(titleBooks);
  } else {
    res.status(404).json({ error: 'No books found with the title' });
  }
};

// Task 5: Get book Review

exports.getBookReview = (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const book = books.find(book => book.isbn === isbn);
  if (book) {
    if (book.reviews) {
      res.json(book.reviews);
    } else {
      res.json([]);
    }
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};

exports.addModifyBookReview = (req, res) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Verify the token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract book information from the request body
    const { bookId, review } = req.body;

    // Check if the review already exists for the book and user
    const existingReview = books.find(
      rev => rev.id === bookId && rev.username === decoded.username
    );

    // Add or modify the review based on its existence
    if (existingReview) {
      existingReview.reviews = review;
      res.json({ message: 'Review modified successfully' });
    } else {
      const newReview = { bookId, username: decoded.username, review };
      books.push(newReview);
      res.json({
        message: 'Review added successfully',
        newReview: newReview,
        review: review,
      });
    }
  });
};

// Task 9: Delete book review added by that particular user

exports.deleteReviewByUser = (req, res) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Verify the token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract the bookId parameter from the request URL
    const bookId = parseInt(req.params.bookId);

    // Find the book by bookId
    const book = books.find(book => book.id === bookId);

    // Check if the book exists and if the user has a review for that book
    if (book && book.reviews[decoded.username]) {
      // Delete the review
      delete book.reviews[decoded.username];
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  });
};
