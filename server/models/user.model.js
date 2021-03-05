const { Schema, model } = require('mongoose');

const User = new Schema({
    username: String,
    email: String,
    hash: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

User.set('toJSON', {
    transform: (doc, data) => {
        data.id = data._id.toString();
        delete data.hash;
        delete data._id;
        delete data.__v;
    }
});

module.exports = model('User', User);