const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helemet = require('helmet');
const userAuthRoute = require('./routes/user');

app.use(morgan('tiny'));
app.use(cors());
app.use(helemet());
app.use(express.json());

app.use('/api/user', userAuthRoute);

module.exports = app;