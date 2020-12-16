const { SECRET } = require('../../utils/config');
const jwt = require('jsonwebtoken');

const generate = user => {
    return jwt.sign({ id: user.id }, SECRET);
}

const authorize = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({ message: 'access denied' });

    const authArray = authorization.split(' ');
    const token = authArray[1];

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(400).json({ message: 'invalid token' });
    }
}

module.exports = {
    generate, authorize
}