// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = sql.Request();

module.exports = class countryRepo {

    static async getAllCountries(httpMethod, res) {
        let reqUrl = '/api/countries';

        try {
            await sqlRequest.query('select * from Countries', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No countries found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all countries"),
                    countries: recordSet.recordset
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async getCountryByID(countryID, httpMethod, res) {
        let reqUrl = '/api/countries/' + countryID;

        try {
            await sqlRequest.query('select * from Countries where ID = ' + countryID, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Country " + countryID + " not found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET country " + countryID),
                    country: recordSet.recordset
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
};