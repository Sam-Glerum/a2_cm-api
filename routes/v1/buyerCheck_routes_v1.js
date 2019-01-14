// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const buyerCheckRepo = require('../../data/repository/buyerCheckRepo');

router.post('/', (req, res) => {
    let buyerCheckInfo = req.body;
    buyerCheckRepo.createBuyerCheck(
        buyerCheckInfo.checkName,
        buyerCheckInfo.name,
        buyerCheckInfo.billingCountry,
        buyerCheckInfo.shippingCountry,
        "POST",
        res
    );
});