const mongoose = require('mongoose');
const { random } = require('lodash');

const BusinessCardSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    businessName: {
        type: String,
        required: true,
    },
    businessDescription: {
        type: String,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    businessPhoneNumber: {
        type: String,
        required: true,
    },
    businessImageURL: {
        type: String,
    },
    cardNumber: {
        type: String,
        default: () => random(100000, 999999).toString(),
    },
});

module.exports = mongoose.model('BusinessCard', BusinessCardSchema);
