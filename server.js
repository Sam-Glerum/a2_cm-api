// Express imports
const express = require('express');
const server = express();
const cors = require('cors');
// Database imports
const mongoose = require('mongoose');
const sql = require('mssql');
const sqlConnection = require('./data/database/SqlDb');
// Model imports
const jsonModel = require('./models/response/JsonModel');
// Parsing imports
const bodyparser = require('body-parser');
// Constant declarations -
const port = process.env.PORT || 3000;

// Set environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// Load body-parser to read the body from requests
server.use(bodyparser.json());

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

// Establish a connection with the cm-a2 SQL database (hosted on Azure)
sqlConnection.connectToSqlDb();

/*
Loading routes
*/
// Load Authentication routes
server.use('/api', require('./routes/v1/authentication_routes_v1'));
// Load Payment routes
server.use('/api/payments', require('./routes/v1/payment_routes_v1'));
// Load Payment Method routes
server.use('/api/paymentMethods', require('./routes/v1/paymentMethod_routes_v1'));
// Load Order routes
server.use('/api/orders', require('./routes/v1/order_routes_v1'));
// Load Merchant routes
server.use('/api/merchants', require('./routes/v1/merchant_routes_v1'));
// Load MerchantCategoryCode routes
server.use('/api/merchantCategories', require('./routes/v1/merchantCategoryCode_routes_v1'));
// Load Alert routes
server.use('/api/alerts', require('./routes/v1/alert_routes_v1'));
// Load Country routes
server.use('/api/countries', require('./routes/v1/country_routes_v1'));
// Load Organization routes
server.use('/api/organizations', require('./routes/v1/organization_routes_v1'));
// Load Currency routes
server.use('/api/currencies', require('./routes/v1/currency_routes_v1'));
// Load MerchantCheck routes
server.use('/api/merchantchecks', require('./routes/v1/merchantCheck_routes_v1'));

server.get("/", (req, res) => {
    res.redirect("/api");
});


server.listen(port, () => {
    console.log("Server is running on port " + port);
});



