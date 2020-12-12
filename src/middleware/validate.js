const Joi = require('@hapi/joi');

const newUser = Joi.object({
    username: Joi.string().min(3).max(8).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required()
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

const registration = (req, res, next) => {
    const { username, email, password } = req.body;

    const { error } = newUser.validate({
        username, email, password 
    });

    if(error) {
        const { details } = error;
        return res.status(400).json({
            message: checkError(details[0])
        });
    }

    next();
}

module.exports = {
    registration
}