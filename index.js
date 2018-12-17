// Express imports
const express = require('express');
const server = express();
// Model imports
const jsonModel = require('./models/response/JsonModel');
// Constant declarations
const port = process.env.PORT || 3000
const apiVersion = "v1";

server.get("/", (req, res) => {
    res.redirect("/api");
});

server.get("/api", (req, res) => {
    res.status(200).json(new jsonModel("/api", "GET", 200, apiVersion, "Welcome to the a2_cm api"));
});


server.listen(port, () => {
    console.log("Server is running on port " + port);
});



