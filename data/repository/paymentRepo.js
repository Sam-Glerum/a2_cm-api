// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

module.exports = class PaymentRepo {

    static async getAllPayments(httpMethod, res) {
        const reqUrl = '/api/payments';

        let sqlRequest = new sql.Request();

        await sqlRequest.query('select * from Payments', (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No payments found"));
            }
            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "GET all Payments"),
                payments: recordSet.recordset
            });
        })
    }

    static async getPaymentByID(paymentID, httpMethod, res) {
        const reqUrl = '/api/payments/' + paymentID;

        let sqlRequest = new sql.Request();

        await sqlRequest.query('select * from Payments where ID = ' + paymentID, (error, recordSet) => {
            if (error) {
                console.log(error);
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Payment " + paymentID + " not found"));
            }

            res.status(200).json({
                response: new jsonModel(reqUrl, httpMethod, 200, "Payment " + paymentID),
                payment: recordSet.recordset});
        })
    }
};



