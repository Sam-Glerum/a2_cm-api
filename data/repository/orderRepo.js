// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class orderRepo {

    static async getAllOrders(httpMethod, res) {
        const reqUrl = '/api/orders';

        await sqlRequest.query('select * from Orders', (error, recordSet) => {
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

    static async getOrderByID(orderID, httpMethod, res) {
        const reqUrl = '/api/orders/' + orderID;

        await sqlRequest.query('select * from Orders where ID = ' + orderID, (error , recordSet) => {
            if (error) {
                console.log(error);
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "Orders"),
                orders: recordSet.recordset
            })
        })
    }
};