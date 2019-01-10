// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class sqlRepo{

    static async getAllItemsFromSQL(response, requestUrl, httpMethod, query, table) {
        try {
            await sqlRequest.query(query, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    response.status(404).json(new jsonModel(
                        requestUrl,
                        httpMethod,
                        404,
                        "No results found"
                    ))
                }

                response.status(200).json({
                    response: new jsonModel(
                        requestUrl,
                        httpMethod,
                        200,
                        "GET all items from " + table
                    ),
                    items: recordSet.recordset
                })
            })
        } catch (error) {
            console.log(error);
            response.status(500).json(new jsonModel(
                requestUrl,
                httpMethod,
                500,
                "Something went wrong, please try again"
            ));
        }
    }

    static async getSingleItemFromSQL(response, requestUrl, httpMethod, query, table, itemID) {
        try {
            await sqlRequest.query(query, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    response.status(404).json(new jsonModel(
                        requestUrl,
                        httpMethod,
                        404,
                        "No results found"
                    ))
                }

                response.status(200).json({
                    response: new jsonModel(
                        requestUrl,
                        httpMethod,
                        200,
                        "GET item " + itemID + " from " + table
                    ),
                    items: recordSet.recordset
                })
            })

        } catch (error) {
            console.log(error);
            response.status(500).json(new jsonModel(
                requestUrl,
                httpMethod,
                500,
                "Something went wrong, please try again"
            ));
        }
    }
};