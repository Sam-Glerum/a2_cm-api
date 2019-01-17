// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const merchantCheck = require('../schema/merchantCheck');
const paymentCheck = require('../schema/paymentCheck');
// Repo imports
const merchantCheckRepo = require('../../data/repository/merchantCheckRepo');
const paymentCheckRepo = require('../../data/repository/paymentCheckRepo');

module.exports = class CheckRepo {

    static async getCheckById(checkID, httpMethod, res) {
        const reqUrl = '/api/checks';

        await merchantCheck.find({_id: checkID})
            .then((merchantCheckParam) => {
                console.log("test: " + merchantCheckParam);
                if (!merchantCheckParam.isNullOrUndefined && merchantCheckParam.length > 0) {
                    res.status(200).json({
                        response: new jsonModel(reqUrl, httpMethod, 200, "GET merchant check"),
                        type: "merchantCheck",
                        check: merchantCheckParam[0]
                    })
                        // .catch((error) => {
                        //     console.log(error);
                        // })
                } else {
                    paymentCheck.find({_id: checkID})
                        .then((paymentCheckParam) => {
                            console.log("test2: " + paymentCheckParam);
                            if (!paymentCheckParam.isNullOrUndefined) {
                                res.status(200).json({
                                    response: new jsonModel(reqUrl, httpMethod, 200, "GET payment check"),
                                    type: "paymentCheck",
                                    check: paymentCheckParam[0]
                                })
                            } else {
                                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No checks found"));
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No checks found"));
                        })
                }
            });
    }

};