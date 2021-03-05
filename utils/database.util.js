const { DB_URI } = require('./config.util');
const logger = require('./logger.util');
const mongoose = require('mongoose');

const options = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = () => {
    mongoose.connect( DB_URI, options)
    .then(() => {
        logger.info(`Connected to database: ${DB_URI}`);
    })
    .catch((err) => {
        logger.error('Connection error:', err);
    });
}