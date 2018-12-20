// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class orderRepo {

    static async getAllMerchants(httpMethod, res) {
        const reqUrl = '/api/merchants';

        sqlRequest.query('select * from Merchants', (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(reqUrl, httpMethod, 404, "No merchants found");
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "Retrieved all merchants"),
                merchants: recordSet.recordset
            })
        })
    }

    static async getMerchantByID(merchantID, httpMethod, res) {
        const reqUrl = '/api/merchants/' + merchantID;

        sqlRequest.query('select * from Merchants where ID = \'' + merchantID + '\'', (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Merchant " + merchantID + " not found"));
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "Merchants"),
                merchant: recordSet.recordset
            })
        })
    }
};