// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');

// Create Request object for querying the SQL database
const sqlRequest = new sql.Request();

module.exports = class alertRepo {

    static async getAllALerts(httpMethod, res) {
        const reqUrl = '/api/alerts';

        sqlRequest.query('select * from Alerts', (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No alerts found"));
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "GET all alerts"),
                alerts: recordSet.recordset
            })
        })
    }
};