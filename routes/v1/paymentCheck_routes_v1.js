// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentCheckRepo = require('../../data/repository/paymentCheckRepo');

// Create merchant check
router.post('/', (req, res) => {
    let paymentCheck = req.body;
    paymentCheckRepo.createPaymentCheck(paymentCheck.amount, paymentCheck.category, paymentCheck.time, paymentCheck.paymentMethod, "POST", res);
});

module.exports = router;

