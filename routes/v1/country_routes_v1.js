// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const countryRepo = require('../../data/repository/countryRepo');

router.get('/', (req, res) => {
    countryRepo.getAllCountries('GET', res);
});

router.get('/:isoCode', (req, res) => {
    let isoCode = req.params.isoCode.toUpperCase();

    countryRepo.getCountryByIsoCode(isoCode, 'GET', res);
});

module.exports = router;
