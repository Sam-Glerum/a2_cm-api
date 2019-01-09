// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const paymentCheck = require('../schema/paymentCheck');

module.exports = class PaymentCheckRepo {
    static async createPaymentCheck(amount, currency, time, paymentMethod, httpMethod, res) {
        const reqUrl = '/api/paymentchecks';

        const newPaymentCheck = new paymentCheck({
            amount: amount,
            currency: currency,
            time: time,
            paymentMethod: paymentMethod
        });

        await newPaymentCheck.save()
            .then(() => {
                res.status(201).json(new jsonModel(reqUrl, httpMethod, 201, "Payment check has been created"));
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been created"))
            })
    }

    static async deletePaymentCheck(checkID, httpMethod, res) {
        const reqUrl = "/api/paymentchecks/" + checkID;

        await paymentCheck.findOne({_id: checkID}).remove().then(() => {
            res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Payment check has been deleted"));
        })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been deleted"))
            })

    }
};