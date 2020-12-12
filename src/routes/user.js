const router = require('express').Router();
const validate = require('../middleware/validate');
const User = require('../models/User');

router.post('/register', validate.registration, (req, res) => {
    console.log('validated:', req.body);
    res.status(201).send('works');
});

router.post('/login', (req, res) => {

});

module.exports = router;