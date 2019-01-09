// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const merchantCheck = require('../schema/paymentCheck');

// Create Request object for querying the SQL database
const sqlRequest = new sql.Request();

module.exports = class checkRepo {

    static async createMerchantCheck(countries, category, httpMethod, res) {
        const reqUrl = '/api/merchantcheck';

        const newMerchantCheck = {
            countries: countries,
            category: category
        };

        await newMerchantCheck.save()
            .then(() => {
                res.status(201).json(new jsonModel(reqUrl, httpMethod, 201, "Merchant check has been created"));
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, merchant check has not been created"));
            })
    }
};
