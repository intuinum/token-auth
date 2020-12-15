const router = require('express').Router();
const validate = require('../middleware/validate');
const genToken = require('../middleware/genToken');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });   
    } catch (error) {
        res.status(500).json({ error });
    }
});

/*router.delete('/:username', async (req, res) => {
    const username = req.params.username.toLocaleLowerCase();
    try {
        const deleted = await User.findOneAndDelete({ username });
        if(deleted) {
            res.status(200).json({ deleted });
        } else {
            res.status(400).json({ message: 'iduunowahthappened'});
        }
    } catch (error) {
        res.status(500).json({error});
    }
});*/

router.post('/register', validate.registration, validate.isUnique,
    async (req, res) => {
        try {
            const saved = await new User(req.user).save();
            res.status(201).json({
                saved,
                token: genToken(saved)
            });
        } catch (error) {
            res.status(500).json({error});
        }
    }
);

router.post('/login', (req, res) => {

});

module.exports = router;