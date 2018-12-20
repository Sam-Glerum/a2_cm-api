// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const organizationRepo = require('../../data/repository/organizationRepo');

router.get('/', (req, res) => {
    organizationRepo.getAllOrganizations('GET', res);
});

router.get('/:organizationID', (req, res) => {
    let organizationID = req.params.organizationID;

    organizationRepo.getOrganizationByID(organizationID, 'GET', res);
});

module.exports = router;
