const Joi = require('@hapi/joi');
const User = require('../models/user.model');

const newUser = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required()
});

const returningUser = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

const checkError = ({ type, path }) => {
    switch (type) {
        case 'any.required':
            if(path == 'email') {
                return 'you need an email';
            } else if (path == 'username') {
                return 'you need a username'
            } else if (path == 'password') {
                return 'you need a password'
            } 
            break;
        case 'string.empty':
            if(path == 'username') {
                return 'you need a username'
            } else if (path == 'password') {
                return 'you need a password'
            } 
        case 'string.email':
            return 'email invalid';

        case 'string.min':
            if(path == 'username') {
                return 'username too short';
            } else if (path == 'password') {
                return 'password too short';
            }
            break;
        case 'string.max':
            return 'username too long';
        default:
            return 'couldn`t handle this error';
    }
}

const isUnique = async (req, res, next) => {
    if(await User.findOne({ username: req.user.username }))
        return res.status(400).json({
            error: 'username already taken'
        });

    if(await User.findOne({ email: req.user.email }))
        return res.status(400).json({
            error: 'email already in use'
        });

    next();
}

const registration = (req, res, next) => {
    const { email, password } = req.body;

    const { error } = newUser.validate({
        email, password 
    });

    if(error) {
        const { details } = error;
        return res.status(400).json({
            message: checkError(details[0])
        });
    }

    req.user = {
        email: email.toLowerCase(),
        password
    }

    next();
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    
    const { error } = returningUser.validate({
        email, password
    });

    if(error) {
        const { details } = error;
        return res.status(400).json({
            message: checkError(details[0])
        });
    }

    req.user = {
        email: email.toLowerCase(),
        password
    }

    next();
}

module.exports = {
    isUnique, registration, login
}