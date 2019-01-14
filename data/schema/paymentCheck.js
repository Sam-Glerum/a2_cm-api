const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentCheckSchema = new Schema({
    amount: {type: String, required: true},
    currency: {type: String},
    time: {type: Number},
    paymentMethod: {type: String},
    createdOn: {type: Date, default: Date.now()}
});

let paymentCheck = mongoose.model('PaymentCheck', paymentCheckSchema);

module.exports = paymentCheck;