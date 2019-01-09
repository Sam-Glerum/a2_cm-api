// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/payments',
        'GET',
        'select * from Payments',
        'Payments'
        )
});

router.get('/:paymentID', (req, res) => {
    let paymentId = req.params.paymentID;
    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/payments',
        'GET',
        'select * from Payments where ID = ' + paymentId,
        'Payments',
        paymentId
    )
});

module.exports = router;