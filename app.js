const express = require('express'); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const cors = require('cors');
const bookRoute = require('./routes/bookRoute.js');
const userRoute = require('./routes/userRoute.js');
const asyncBookRoute = require('./routes/asyncBookRoute.js');
/*********************Authen**************************** */
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());

/**********************POST API ************************** */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

// app.use('/', bookRoute);
app.use('/', asyncBookRoute);
app.use('/user', userRoute);

module.exports = app;
