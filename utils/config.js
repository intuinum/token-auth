require('dotenv').config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const DB_URI = () => {
    if(process.env.NODE_ENV === 'test') {
        return process.env.TEST_DB_URI;
    } else if (process.env.NODE_ENV === 'development') {
        return process.env.DEV_DB_URI;
    }

    return process.env.DB_URI;
}

module.exports = {
    PORT,
    DB_URI,
    SECRET
}