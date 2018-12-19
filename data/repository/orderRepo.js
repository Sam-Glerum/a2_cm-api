// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');

module.exports = class orderRepo {

    static async getAllOrders(res) {
        const reqUrl = '/api/orders';
        const httpMethod = 'GET';

        const sqlRequest = new sql.Request();

        sqlRequest.query('select * from Orders', (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No orders found"));
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "Orders"),
                orders: recordSet.recordset
            })
        })
    }
};