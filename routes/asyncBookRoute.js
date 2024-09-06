const express = require('express');
const controller = require('../controller/asyncBookController');
const { verifyToken } = require('../middleware/verifyToken.js');

const Router = express.Router();

Router.get('/books', controller.getAllBooks);
Router.get('/books/:isbn', controller.searchByISBN);
Router.get('/books/author/:author', controller.searchByAuthor);
Router.get('/books/title/:title', controller.searchByTitle);

module.exports = Router;
