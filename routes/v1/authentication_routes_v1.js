// Express imports
const express = require('express');
const router = express.Router();
// Authentication imports
const authentication = require('../../authentication/authentication');
// Response imports
const jsonModel = require('../../models/response/JsonModel');
// Validation imports
const checkObjects = require('../../models/validation/CheckObjects');
// Repository imports
const userRepo = require('../../data/repository/userRepo');

router.use("/", (req, res, next) => {
    res.contentType("application/json");
    next();
});

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
    const loginInfo = req.body;
    if (!checkObjects.isValidLogin(loginInfo)) {
        res.status(412).json(new jsonModel("/api/login", "POST", 412, "Request body properties are invalid or missing"));
    } else {

        try {
            // Get the properties from the request body
            let username = loginInfo.username.trim().toLowerCase();
            let password = loginInfo.password.trim();

            // Call the login method to login to the api
            userRepo.login(username, password, "POST", res);
        } catch (error) {
            console.log(error);
        }
    }
});

// Registration route
router.post('/register', (req, res) => {
    const registerInfo = req.body;
    if (!checkObjects.isValidRegistration(registerInfo)) {
        res.status(412).json(new jsonModel("/api/register", "POST", 412, "Request body properties are invalid or missing"));
    } else {

        try {
            // Get the properties from the request body
            const username = registerInfo.username.trim().toLowerCase();
            const email = registerInfo.email.trim().toLowerCase();
            const password = registerInfo.password.trim();

            // Call the createUser method to add a user to the database
            userRepo.createUser(username, email, password, res);
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;