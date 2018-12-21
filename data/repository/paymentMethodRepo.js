// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class paymentMethodRepo {

    static async getAllPaymentMethods(httpMethod, res) {
        let reqUrl = '/api/paymentMethods';

        try {
            await sqlRequest.query('select * from PaymentMethods', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No payment methods found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all payment methods"),
                    paymentMethods: recordSet.recordset
                })
            })

        } catch (err) {
            console.log(err);
        }
    }

    static async getPaymentMethodByName(paymentMethodName, httpMethod, res) {
        let reqUrl = '/api/paymentMethods/' + paymentMethodName;

        try {
            await sqlRequest.query('select * from PaymentMethods where PaymentMethod = \'' + paymentMethodName + '\'', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Payment method " + paymentMethodName + " not found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET payment method " + paymentMethodName),
                    paymentMethod: recordSet.recordset
                })
            })

        } catch (err) {
            console.log(err);
        }
    }
};