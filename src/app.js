const { DB_URI } = require('../utils/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helemet = require('helmet');
const userAuthRoute = require('./routes/user');

mongoose.connect(
    DB_URI(),
    {
        useNewUrlParser: true, useUnifiedTopology: true
    },
    (error) => {
        if(error) {console.log(error);}
        else {console.log('Connected to database');}
    }
);

app.use(morgan('tiny'));
app.use(cors());
app.use(helemet());
app.use(express.json());

app.use('/api/users', userAuthRoute);

module.exports = app;