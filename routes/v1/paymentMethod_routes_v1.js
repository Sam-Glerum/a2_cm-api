// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentMethodRepo = require('../../data/repository/paymentMethodRepo');

router.get('/', (req, res) => {
    paymentMethodRepo.getAllPaymentMethods('GET', res);
});

router.get('/:paymentMethodName', (req, res) => {
    let paymentMethodName = req.params.paymentMethodName.toUpperCase();

    paymentMethodRepo.getPaymentMethodByName(paymentMethodName, 'GET', res);
});

module.exports = router;