// Express imports
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Payment routes v1");
});

router.get('/:paymentID', (req, res) => {
    res.send("Get single payment");
});


module.exports = router;