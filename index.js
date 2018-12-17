// Express imports
const express = require('express');
const server = express();
const cors = require('cors');
// Model imports
const jsonModel = require('./models/response/JsonModel');
// Constant declarations
const port = process.env.PORT || 3000
const apiVersion = "v1";

// Set environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}


// Enable CORS headers
server.use(cors());

/*
Loading routes
*/
// Load Authentication routes
server.use('/api', require('./routes/v1/authentication_routes_v1'));

server.get("/", (req, res) => {
    res.redirect("/api");
});

server.get("/api", (req, res) => {
    res.status(200).json(new jsonModel("/api", "GET", 200, apiVersion, "Welcome to the a2_cm api"));
});


server.listen(port, () => {
    console.log("Server is running on port " + port);
});



