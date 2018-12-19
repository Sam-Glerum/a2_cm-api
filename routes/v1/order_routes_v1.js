// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const orderRepo = require('../../data/repository/orderRepo');

router.get('/', (req, res) => {
    orderRepo.getAllOrders(res);
});

router.get('/:orderID', (req, res) => {
    let orderId = req.params.orderID;

    orderRepo.getOrderByID(orderId, res);
});


module.exports = router;