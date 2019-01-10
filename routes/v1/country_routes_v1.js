// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/countries',
        'GET',
        'select * from Countries',
        'Countries'
    )
});

router.get('/:isoCode', (req, res) => {
    let isoCode = req.params.isoCode.toUpperCase();

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/countries/' + isoCode,
        'GET',
        'select * from Countries where IsoCode = \'' + isoCode + '\'',
        'Countries',
        isoCode
    )
});

module.exports = router;
