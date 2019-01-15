// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const merchantCheckRepo = require('../../data/repository/merchantCheckRepo');

// Create merchant check
router.post('/', (req, res) => {
    let merchantCheck = req.body;
    merchantCheckRepo.createMerchantCheck(merchantCheck.checkName, merchantCheck.countries, merchantCheck.category, "POST", res);
});

//Read merchant check
router.get('/', (req, res) => {
    merchantCheckRepo.readMerchantCheck("GET", res);
});

// Update merchant check
router.put('/', (req, res) => {
    let merchantCheck = req.body;
    merchantCheckRepo.updateMerchantCheck(merchantCheck.checkName, merchantCheck.checkId, merchantCheck.countries, merchantCheck.category, "PUT", res);
});

// Delete merchant check
router.delete('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    merchantCheckRepo.deleteMerchantCheck(checkID, "DELETE", res);
});

module.exports = router;

