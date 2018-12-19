// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const paymentRepo = require('../../data/repository/paymentRepo');

router.get('/', (req, res) => {
    paymentRepo.getAllPayments(res);
});

router.get('/:paymentID', (req, res) => {
    res.send("Get single payment");
});


module.exports = router;