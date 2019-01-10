// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentCheckRepo = require('../../data/repository/paymentCheckRepo');

// Create payment check
router.post('/', (req, res) => {
    let paymentCheck = req.body;
    paymentCheckRepo.createPaymentCheck(paymentCheck.amount, paymentCheck.currency, paymentCheck.time, paymentCheck.paymentMethod, "POST", res);
});

// Read payment check
router.get('/', (req, res) => {
    paymentCheckRepo.readPaymentCheck("GET", res);
});

// Update payment check
router.put('/', (req, res) => {
    let paymentCheck = req.body;
    paymentCheckRepo.updatePaymentCheck(paymentCheck.checkId, paymentCheck.amount, paymentCheck.currency, paymentCheck.time, paymentCheck.paymentMethod, "PUT", res);
});

// Delete payment check
router.delete('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    paymentCheckRepo.deletePaymentCheck(checkID, "DELETE", res);
});

module.exports = router;

