// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {

    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/merchantCategories',
        'GET',
        'select * from MerchantCategoryCodes',
        'MerchantCategoryCodes'
    )
});

router.get('/:categoryCode', (req, res) => {
    let categoryCode = req.params.categoryCode

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/merchantCategories/' + categoryCode,
        'GET',
        'select * from MerchantCategoryCodes where Mcc = ' + categoryCode,
        'MerchantCategoryCodes',
        categoryCode
    )
});

module.exports = router;
