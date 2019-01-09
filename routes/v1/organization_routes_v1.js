// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/organizations',
        'GET',
        'select * from Organizations',
        'Organizations'
    );
});

router.get('/:organizationID', (req, res) => {
    let organizationID = req.params.organizationID;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/organizations',
        'GET',
        'select * from Organizations where ID = \'' + organizationID + '\'',
        'Organizations',
        organizationID
    )
});

module.exports = router;
