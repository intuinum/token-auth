const { SECRET } = require('../../utils/config');
const jwt = require('jsonwebtoken');

module.exports = user => {
    return jwt.sign({ id: user.id }, SECRET);
}