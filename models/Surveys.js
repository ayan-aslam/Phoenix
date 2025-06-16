const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient'); // Assuming you have a Recipient model defined


const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    dateSent: Date,
    lastResponded: Date
})


mongoose.model('surveys', surveySchema);

