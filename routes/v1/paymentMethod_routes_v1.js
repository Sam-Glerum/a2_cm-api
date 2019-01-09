// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {

    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/paymentMethods',
        'GET',
        'select * from PaymentMethods',
        'PaymentMethods'
    )
});

router.get('/:paymentMethodName', (req, res) => {
    let paymentMethodName = req.params.paymentMethodName.toUpperCase();

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/paymentMethods/' + paymentMethodName,
        'GET',
        'select * from PaymentMethods where PaymentMethod = \'' + paymentMethodName + '\'',
        'PaymentMethods',
        paymentMethodName
    )
});

module.exports = router;
