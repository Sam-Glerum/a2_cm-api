// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const merchantCheck = require('../schema/merchantCheck');

module.exports = class MerchantCheckRepo {

    static async createMerchantCheck(countries, category, httpMethod, res) {
        const reqUrl = '/api/merchantchecks';

        const newMerchantCheck = new merchantCheck({
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

    static async readMerchantCheck(httpMethod, res) {
        const reqUrl = '/api/merchantchecks';

        await merchantCheck.find({}, function (err, docs) {
            res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, docs));
        })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, payment check has not been updated"))
            });
    }

    static async updateMerchantCheck(checkID, countries, category, httpMethod, res) {
        const reqUrl = '/api/merchantchecks';

        await merchantCheck.findOne({_id: checkID}, function (err, docs) {
            if (docs === null) {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Check not found"))
            } else if (err) {
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Internal server error"))
            }
            else if (countries != null && category != null) {
                docs.countries = countries;
                docs.category = category;
                docs.save()
                    .then(() => {
                        res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Merchant check has been updated"));
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, merchant check has not been updated"))
                    });
            } else {
                res.status(412).json(new jsonModel(reqUrl, httpMethod, 412, "Missing variables"))
            }
        })
    }

    static async deleteMerchantCheck(checkID, httpMethod, res){
        const reqUrl = "/api/merchantchecks/" + checkID;

        await merchantCheck.findById({_id: checkID})
            .then((merchantCheck) => {
                if (merchantCheck == null) {
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Merchant " + checkID + " not found"));
                }
                else {
                    merchantCheck.remove();
                    res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Merchant check has been deleted"));
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, merchant check has not been deleted"))
            })
    };
};