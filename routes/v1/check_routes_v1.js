// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const checkRepo = require('../../data/repository/checkRepo');

router.get('/:checkID', (req, res) => {
    let checkID = req.params.checkID;
    checkRepo.getCheckById(checkID, "GET", res);
});

module.exports = router;