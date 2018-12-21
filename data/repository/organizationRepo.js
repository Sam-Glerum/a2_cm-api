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
            })

        } catch (err) {
            console.log(err);
        }
    }

    static async getOrganizationByID(organizationID, httpMethod, res) {
        let reqUrl = '/api/organizations/' + organizationID;

        try {
            await sqlRequest.query('select * from Organizations where ID = \'' + organizationID + '\'', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Organization " + organizationID + " not found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET organization " + organizationID),
                    organization: recordSet.recordset
                })
            })

        } catch (err) {
            console.log(err);
        }
    }
};