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

router.get('/:checkID', (req, res) => {
    let checkID = req.params.checkID;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/alerts/' + checkID,
        'GET',
        "SELECT o.* FROM Orders o " +
        "inner join Alerts a on o.id = a.id " +
        "WHERE a.controle = '" + checkID + "'",
        'Alerts',
        checkID
    )
});

module.exports = router;