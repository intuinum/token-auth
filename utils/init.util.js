const { PORT, DB_URI, SECRET } = require('./config.util');

module.exports = () => {
    if(!PORT) throw new Error('Port number missing');
    else if (!DB_URI) throw new Error('Database URI missing');
    else if (!SECRET) throw new Error('Token secret missing');

    require('./database.util')();
}