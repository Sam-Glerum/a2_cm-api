const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let merchantCheckSchema = new Schema({
    checkName: String,
    countries: [],
    category: String,
    createdOn: {type: Date, default: Date.now()}
});

let merchantCheck = mongoose.model('MerchantCheck', merchantCheckSchema);

module.exports = merchantCheck;