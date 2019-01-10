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

    static async readPaymentCheck(httpMethod, res) {
        const reqUrl = '/api/paymentchecks';

        await paymentCheck.find({}, function (err, docs) {
            res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, docs));
        })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been updated"))
            });
    }

    static async updatePaymentCheck(checkID, amount, currency, time, paymentMethod, httpMethod, res) {
        const reqUrl = '/api/paymentchecks';

        await paymentCheck.findOne({_id: checkID}, function (err, docs) {
            if (docs === null) {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Check not found"))
            } else if (err) {
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Internal server error"))
            }
            else if (amount != null && currency != null && time != null && paymentMethod != null) {
                docs.amount = amount;
                docs.currency = currency;
                docs.time = time;
                docs.paymentMethod = paymentMethod;
                docs.save()
                    .then(() => {
                        res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Payment check has been updated"));
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been updated"))
                    });
            } else {
                res.status(412).json(new jsonModel(reqUrl, httpMethod, 412, "Missing variables"))
            }
        })
    }

    static async deletePaymentCheck(checkID, httpMethod, res) {
        const reqUrl = "/api/paymentchecks/" + checkID;


        // await paymentCheck.findOne({_id: checkID}).remove().then(() => {
        await paymentCheck.findById({_id: checkID})
            .then((paymentcheck) => {
                if (paymentcheck == null) {
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 200, "Payment " + checkID + " not found"));
                }
                else {
                    paymentcheck.remove();
                    res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Payment check has been deleted"));
                }
        })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been deleted"))
            })
    }
};