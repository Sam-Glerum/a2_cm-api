const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let merchantCheckSchema = new Schema({
    countries: [],
    category: String,
});

let merchantCheck = mongoose.model('MerchantCheck', merchantCheckSchema);

module.exports = merchantCheck;