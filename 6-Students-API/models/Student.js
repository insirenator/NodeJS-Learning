const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name.'],
        trim: true,
    },

    age: {
        type: Number,
        required: [true, 'Must provide age.'],
    },

    isEligible: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Student', StudentSchema);