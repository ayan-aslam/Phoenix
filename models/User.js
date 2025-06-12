const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    }
});

mongoose.model('users', userSchema);
// This code defines a Mongoose schema for a user model with a single field, googleId, which is of type String.