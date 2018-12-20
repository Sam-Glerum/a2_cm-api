// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class organizationRepo {

    static async getAllOrganizations(httpMethod, res) {
        let reqUrl = '/api/organizations';

        try {
            await sqlRequest.query('select * from Organizations', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No organizations found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all organizations"),
                    organizations: recordSet.recordset
                })
            }).catch((error) => {
                console.log(error);
            });

        } catch (err) {
            console.log(err);
        }
    }
};