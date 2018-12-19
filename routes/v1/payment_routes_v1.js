// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentRepo = require('../../data/repository/paymentRepo');

router.get('/', (req, res) => {
    paymentRepo.getAllPayments(res);
});

router.get('/:paymentID', (req, res) => {
    let paymentId = req.params.paymentID;
    paymentRepo.getPaymentByID(paymentId, res);
});


module.exports = router;