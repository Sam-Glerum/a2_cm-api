// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const currencyRepo = require('../../data/repository/currencyRepo');

router.get('/', (req, res) => {
    currencyRepo.getAllCurrencies('GET', res);
});

router.get('/:currencyCode', (req, res) => {
    let currencyCode = req.params.currencyCode.toUpperCase();

    currencyRepo.getCurrencyByCurrencyCode(currencyCode, 'GET', res);
});

module.exports = router;
