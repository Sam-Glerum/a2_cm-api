// Express imports
const express = require('express');
const server = express();
const cors = require('cors');
// Database imports
const mongoose = require('mongoose');
// Model imports
const jsonModel = require('./models/response/JsonModel');
// Parsing imports
const bodyparser = require('body-parser');
// Constant declarations
const port = process.env.PORT || 3000;

// Set environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// Load body-parser to read the body from requests
server.use(bodyparser.json());

// Enable CORS headers
server.use(cors());

const DATABASE_NAME = process.env.dbName;
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const CONNECTION_STRING = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@cm-a2-c2mt3.mongodb.net/'+ DATABASE_NAME +'?retryWrites=true';

// Establish a connection with the cm-a2 database (hosted on Atlas)
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
// Print a message after the connection with the database has been made
mongoose.connection.once('open', () => {
    console.log("Connected to the database " + DATABASE_NAME);
});

/*
Loading routes
*/
// Load Authentication routes
server.use('/api', require('./routes/v1/authentication_routes_v1'));

server.get("/", (req, res) => {
    res.redirect("/api");
});

server.get("/api", (req, res) => {
    res.status(200).json(new jsonModel("/api", "GET", 200, "Welcome to the a2_cm api"));
});


server.listen(port, () => {
    console.log("Server is running on port " + port);
});



