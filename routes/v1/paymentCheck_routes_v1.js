// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const checkRepo = require('../../data/repository/checkRepo');

// Create merchant check
router.post('/', (req, res) => {
    let paymentCheck = req.body;
    checkRepo.createPaymentCheck(paymentCheck.amount, paymentCheck.category, paymentCheck.time, paymentCheck.paymentMethod, "POST", res);
});

module.exports = router;

