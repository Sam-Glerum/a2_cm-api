// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentRepo = require('../../data/repository/paymentRepo');

router.get('/', (req, res) => {
    paymentRepo.getAllPayments('GET', res);
});

router.get('/:paymentID', (req, res) => {
    let paymentId = req.params.paymentID;
    paymentRepo.getPaymentByID(paymentId, 'GET', res);
});

module.exports = router;