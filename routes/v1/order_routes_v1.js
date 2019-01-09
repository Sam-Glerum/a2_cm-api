// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/orders',
        'GET',
        'select * from Orders',
        'Orders'
    )
});

router.get('/:orderID', (req, res) => {
    let orderId = req.params.orderID;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/orders/' + orderId,
        'GET',
        'select * from Orders where ID = ' + orderId,
        'Orders'
    )
});


module.exports = router;