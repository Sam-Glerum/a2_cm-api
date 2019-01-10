// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/currencies',
        'GET',
        'select * from Currencies',
        'Currencies'
    );
});

router.get('/:currencyCode', (req, res) => {
    let currencyCode = req.params.currencyCode.toUpperCase();

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/currencies',
        'GET',
        'select * from Currencies where CurrencyCode = \'' + currencyCode + '\'',
        'Currencies',
        currencyCode
    )
});

module.exports = router;
