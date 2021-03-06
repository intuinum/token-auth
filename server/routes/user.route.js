const router = require('express').Router();
const crypt = require('bcrypt');
const validate = require('../middleware/validate');
const { generate, authorize } = require('../middleware/token');
const User = require('../models/user.model');

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
            email: req.user.email  
        });

        if(!user) return res.status(400).json({
            message: 'Incorrect login (email)'
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

router.get('/', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) throw `couldn't find user`;
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

router.delete('/', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) throw `couldn't find user`;

        await User.findByIdAndDelete(req.user.id)
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

module.exports = router;