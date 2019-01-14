// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const buyerCheckRepo = require('../../data/repository/buyerCheckRepo');

router.get('/', (req, res) => {
    buyerCheckRepo.getAllBuyerChecks("GET", res);
});

router.get('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    buyerCheckRepo.getBuyerCheckById(checkID, "GET", res);
});

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

router.delete('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    buyerCheckRepo.deleteBuyerCheckByID(checkID, "DELETE", res);
});

module.exports = router;