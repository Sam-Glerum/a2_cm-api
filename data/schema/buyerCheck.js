// Mongoose import
const mongoose = require('mongoose');
// Schema initialization
const Schema = mongoose.Schema;

let buyerCheckSchema = new Schema({
    checkName: {type: String},
    name: {type: String},
    billingCountry: {type: String},
    shippingCountry: {type: String}
});

let buyerCheck = mongoose.model('BuyerCheck', buyerCheckSchema);

module.exports = buyerCheck;