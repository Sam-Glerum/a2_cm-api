// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const countryRepo = require('../../data/repository/countryRepo');

router.get('/', (req, res) => {
    countryRepo.getAllCountries('GET', res);
});

router.get('/:countryID', (req, res) => {
    let countryID = req.params.countryID;

    countryRepo.getCountryByID(countryID, 'GET', res);
});

module.exports = router;
