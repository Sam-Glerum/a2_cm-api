// Express imports
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Payment routes v1");
});


module.exports = router;