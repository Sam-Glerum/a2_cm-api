// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const merchantRepo = require('../../data/repository/merchantRepo');

router.get('/', (req, res) => {
    merchantRepo.getAllMerchants('GET', res);
});

router.get('/:merchantID', (req, res) => {
    let merchantID = req.params.merchantID;

    merchantRepo.getMerchantByID(merchantID, 'GET', res);
});

module.exports = router;
