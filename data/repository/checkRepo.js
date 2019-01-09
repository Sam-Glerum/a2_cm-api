// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const merchantCheck = require('../schema/merchantCheck');
const paymentCheck = require('../schema/paymentCheck');

module.exports = class checkRepo {

    static async createMerchantCheck(countries, category, httpMethod, res) {
        const reqUrl = '/api/merchantchecks';

        const newMerchantCheck =  new merchantCheck({
            countries: countries,
            category: category
        });

        // await newMerchantCheck.save()
        await newMerchantCheck.save()
            .then(() => {
                res.status(201).json(new jsonModel(reqUrl, httpMethod, 201, "Merchant check has been created"));
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, merchant check has not been created"));
            })
    }

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
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 201, "Something went wrong, payment check has not been creaeted"))
            })
    }
};
