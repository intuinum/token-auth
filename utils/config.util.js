require('dotenv').config();
const PORT = process.env.PORT || 6969;
let DB_URI;

if(process.env.NODE_ENV === 'development')
    DB_URI = process.env.DB_DEV;
else
    DB_URI = process.env.DB_PRODUCTION

const SECRET = process.env.SECRET;

module.exports = { PORT, DB_URI, SECRET }