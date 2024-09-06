const express = require('express');
const controller = require('../controller/bookController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

const Router = express.Router();

Router.get('/books', controller.getBooks);
Router.get('/books/:isbn', controller.getBooksByISBN);
Router.get('/books/author/:author', controller.getBookByAuthor);
Router.get('/books/title/:title', controller.getBookByTitle);
Router.get('/books/:isbn/reviews', controller.getBookReview);
Router.post('/books/review', verifyToken, controller.addModifyBookReview);
Router.delete(
  '/books/review/:bookId',
  verifyToken,
  controller.deleteReviewByUser
);

module.exports = Router;
