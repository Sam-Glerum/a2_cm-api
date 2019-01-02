// Entity import
const User = require('../schema/user');
// Response import
const jsonModel = require('../../models/response/JsonModel');
// Authentication import
const authentication = require('../../authentication/authentication');
// Encryption import
const bcrypt = require('bcrypt');

module.exports = class userRepo {

    static async createUser(usernameParam, emailParam, passwordParam, httpMethod, res) {
        let BCRYPT_SALT_ROUNDS = 12;

        const reqUrl = "/api/register";
        const apiVersion = "v1";
        // Search the database for the supplied username
        await User.findOne({username: usernameParam})
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
                                response: new jsonModel(reqUrl, httpMethod, 201, "User " + user.username + " has been created"),
                                token: token
                            });
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong. User " + usernameParam + " has not been created"));
                        })
                } else {
                    res.status(409).json(new jsonModel(reqUrl, httpMethod, 409, "User " + user.username + " already exists"));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong. Please try again."));
            })
    }

    static async login(usernameParam, passwordParam, httpMethod, res) {
        const reqUrl = "/api/login";

        // Search the database for the supplied username
        await User.findOne({username: usernameParam})
            .then((user) => {
                // Check if the supplied password is the same as the user's password
                if (user.password === passwordParam) {
                    // Assign a token to the user
                    let token = authentication.encodeToken(usernameParam);
                    res.status(200).json({
                        response: new jsonModel(reqUrl, httpMethod, 200, "You have succesfully logged in"),
                        token: token
                    });
                } else {
                    res.status(401).json(new jsonModel(reqUrl, httpMethod, 401, "Password is incorrect"));
                }
            })
            .catch(() => {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "User not found"));
            })
    }
};