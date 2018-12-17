// Entity import
const User = require('../schema/user');
// Response import
const jsonModel = require('../../models/response/JsonModel');
// Authentication import
const authentication = require('../../authentication/authentication');

module.exports = class userRepo {

    static createUser(usernameParam, emailParam, passwordParam, res) {
        const reqUrl = "/api/register";
        const httpMethod = "POST";
        const apiVersion = "v1";
        // Search the database for the supplied username
        User.findOne({username: usernameParam})
            .then((user) => {
                // Check if the username is already present in the database
                if (user === null) {
                    // Create a new user object if the user does not exist in the database
                    const newUser = new User({
                        username: usernameParam,
                        email: emailParam,
                        password: passwordParam
                    });
                    // Save the user to the database
                    newUser.save()
                        .then((user) => {
                            // Create a token based on the supplied username
                            let token = authentication.encodeToken(usernameParam);
                            res.status(201).json({
                                response: new jsonModel(reqUrl, httpMethod, 201, apiVersion, "User " + user.username + " has been created"),
                                token: token
                            });
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, apiVersion, "Something went wrong. User " + usernameParam + " has not been created"));
                        })
                } else {
                    res.status(409).json(new jsonModel(reqUrl, httpMethod, 409, "User " + user.username + " already exists"));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, apiVersion, "Something went wrong. Please try again."));
            })
    }
};