const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address = new Schema({
    houseNumber: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
        min: 500000,
        max: 600000,
        validate: [pincodeValidator, 'Invalid pincode format']
    }
});

const authorSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
    permanentAddress: address,
    temporaryAddress: address
});

function pincodeValidator(value) {
    return value.toString().match(/^\d{4}$|^\d{6}$/) &&  value.length == 6;
}

const author = mongoose.model('authorModel', authorSchema, 'authors');
module.exports = author;