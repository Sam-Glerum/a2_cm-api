// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const merchantCheckRepo = require('../../data/repository/merchantCheckRepo');

// Create merchant check
router.post('/', (req, res) => {
    let merchantCheck = req.body;
    merchantCheckRepo.createMerchantCheck(merchantCheck.countries, merchantCheck.category, "POST", res);
});

module.exports = router;

