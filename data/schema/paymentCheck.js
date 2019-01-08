const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentCheckSchema = new Schema({
    amount: {type: mongoose.Schema.Types.Decimal},
    currency: {type: String},
    time: {type: Number},
    paymentMethod: {type: String}
});

let paymentCheck = mongoose.model('PaymentCheck', paymentCheckSchema);

module.exports = paymentCheck;