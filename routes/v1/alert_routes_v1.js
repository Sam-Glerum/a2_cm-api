// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const alertRepo = require('../../data/repository/alertRepo');

router.get('/', (req, res) => {
    alertRepo.getAllALerts('GET', res);
});

router.get('/:alertID', (req, res) => {
    let alertID = req.params.alertID;
    alertRepo.getAlertByID(alertID, 'GET', res);
});

module.exports = router;