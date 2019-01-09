// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const merchantRepo = require('../../data/repository/merchantRepo');
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {

    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/merchants',
        'GET',
        'select * from Merchants',
        'Merchants'
    )
});

router.get('/:merchantID', (req, res) => {
    let merchantID = req.params.merchantID;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/merchants/' + merchantID,
        'GET',
        'select * from Merchants where ID = \'' + merchantID + '\'',
        'Merchants',
        merchantID
    )
});

module.exports = router;
