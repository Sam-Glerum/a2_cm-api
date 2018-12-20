// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class organizationRepo {

    static async getAllCurrencies(httpMethod, res) {
        let reqUrl = '/api/currencies';

        try {
            await sqlRequest.query('select * from Currencies', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No currencies found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all currencies"),
                    currencies: recordSet.recordset
                })
            })

        } catch (err) {
            console.log(err);
        }
    }

    static async getCurrencyByCurrencyCode(currencyCode, httpMethod, res) {
        let reqUrl = '/api/currencies/' + currencyCode;

        try {
            await sqlRequest.query('select * from Currencies where ID = \'' + currencyCode + '\'', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Currency " + currencyCode + " not found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET currency " + currencyCode),
                    currency: recordSet.recordset
                })
            })

        } catch (err) {
            console.log(err);
        }
    }
};