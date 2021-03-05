const router = require('express').Router();
const crypt = require('bcrypt');
const validate = require('../middleware/validate');
const { generate } = require('../middleware/token');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });   
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/register', validate.registration, validate.isUnique,
    async (req, res) => {
        const salt = await crypt.genSalt(10);
        req.user.hash = await 
            crypt.hash(req.user.password, salt);

        try {
            const saved = await new User(req.user).save();
            res.status(201).json({
                saved,
                token: generate(saved)
            });
        } catch (error) {
            res.status(500).json({error});
        }
    }
);

router.post('/login', validate.login, 
    async (req, res) => {
        const user = await User.findOne({
            username: req.user.username  
        });

        if(!user) return res.status(400).json({
            message: 'Incorrect login (username)'
        });

        const passwordValid = await crypt.compare(req.user.password, user.hash)
        if(!passwordValid) return res.status(400).json({
            message: 'Incorrect login (password)'
        });

        res.status(200).json({
            user,
            token: generate(user)
        });
    }
);

module.exports = router;