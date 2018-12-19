// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

module.exports = class PaymentRepo {

    static getAllPayments(res) {
        const reqUrl = '/api/payments';
        const httpMethod = 'POST';

        let sqlRequest = new sql.Request();

        sqlRequest.query('select * from Payments', (error, recordSet) => {
            if (error) {
                console.log(error);
            }
            res.status(200).json(recordSet);
        })
    }
};



