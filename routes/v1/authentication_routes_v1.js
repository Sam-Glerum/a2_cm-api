// Express imports
const express = require('express');
const router = express.Router();
// Authentication imports
const authentication = require('../../authentication/authentication');

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
router.get('/login', (req, res) => {

});

// Registration route
router.get('/register', (req, res) => {

});

module.exports = router;