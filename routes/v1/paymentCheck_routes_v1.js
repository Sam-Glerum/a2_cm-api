// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentCheckRepo = require('../../data/repository/paymentCheckRepo');

// Create merchant check
router.post('/', (req, res) => {
    let paymentCheck = req.body;
    paymentCheckRepo.createPaymentCheck(paymentCheck.amount, paymentCheck.currency, paymentCheck.time, paymentCheck.paymentMethod, "POST", res);
});

// Delete merchant check
router.delete('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    paymentCheckRepo.deletePaymentCheck(checkID, "DELETE", res);
});

module.exports = router;

