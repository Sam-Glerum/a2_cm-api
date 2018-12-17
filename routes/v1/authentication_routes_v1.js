// Express imports
const express = require('express');
const router = express.Router();
// Authentication imports
const authentication = require('../../authentication/authentication');
// Response imports
const jsonModel = require('../../models/response/JsonModel');
// Validation imports
const checkObjects = require('../../models/validation/CheckObjects');

// Route that is accessed by all requests to check if the user is authenticated to the server
router.all(new RegExp("^(?!\/login$|\/register$).*"), (req, res, next) => {
    // Get token from headers
    const token = req.header('X-Access-Token');

    authentication.decodeToken(token, (error, payload) => {
        if (error) {
            console.log('Authentication error: ' + error.message);

            res.status((error.status || 401)).json("Not Authorised");
        } else {
            req.user = {
                username: payload.sub
            };
            next();
        }
    })
});

// Login route
router.post('/login', (req, res) => {
    const registerInfo = req.body;
    if (!checkObjects.isValidRegistration(registerInfo)) {
        res.status(412).json(new jsonModel("/api/login", "POST", 412, "v1", "Request body properties are invalid or missing"));
    }

    const username = registerInfo.username.trim().toLowerCase();
    const email = registerInfo.email.trim().toLowerCase();
    const password = registerInfo.password.trim();

    //TODO setup UserRepo and add createUser() method

});

// Registration route
router.post('/register', (req, res) => {

});

module.exports = router;