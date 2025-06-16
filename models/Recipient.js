const mongoose = require('mongoose'); // Fixed typo
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;