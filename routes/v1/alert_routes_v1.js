// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/alerts',
        'GET',
        'select * from Alerts',
        'Alerts'
    )
});

router.get('/:alertID', (req, res) => {
    let alertID = req.params.alertID;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/alerts/' + alertID,
        'GET',
        'select * from Alerts where ID = ' + alertID,
        'Alerts',
        alertID
    )
});

module.exports = router;