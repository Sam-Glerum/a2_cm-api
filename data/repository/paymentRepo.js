// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

export class PaymentRepo {

    static getAllPayments(res) {
        const reqUrl = '/api/payments';
        const httpMethod = 'POST';

        let sqlRequest = sql.Request();

        sqlRequest.query('select * from Payment', (error, recordSet) => {
            if (error) {
                console.log(error);
            }
            res.status(200).json(recordSet);
        })
    }
}



