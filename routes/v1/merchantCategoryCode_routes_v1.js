// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const merchantCategoryRepo = require('../../data/repository/merchantCategoryRepo');

router.get('/', (req, res) => {
    merchantCategoryRepo.getAllMerchantCategoryCodes('GET', res);
});

router.get('/:categoryCode', (req, res) => {
    let categoryCode = req.params.categoryCode

    merchantCategoryRepo.getCategoryInfoByCategoryCode(categoryCode, 'GET', res);
});

module.exports = router;
