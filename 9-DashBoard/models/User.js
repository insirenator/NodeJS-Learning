const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Must provide first name']
    },
    lastname: {
        type: String,
        required: [true, 'Must provide last name']
    },
    username: {
        type: String,
        required: [true, 'Must provide username']
    },
    password: {
        type: String,
        required: [true, 'Must provide password']
    },
});

module.exports = mongoose.model('Users', User);