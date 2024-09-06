const express = require('express');
const controller = require('../controller/bookController.js');
const { signup, login } = require('../controller/userController.js');

const Router = express.Router();

Router.post('/register', signup);
Router.post('/login', login);

module.exports = Router;
