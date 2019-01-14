// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const buyerCheck = require('../schema/buyerCheck');

module.exports = class BuyerCheckRepo {

    static async createBuyerCheck(checkName, name, billingCountry, shippingCountry, httpMethod, res) {
        const reqUrl = '/api/buyerChecks';

        if (name.isNullOrUndefined || billingCountry.isNullOrUndefined || shippingCountry.isNullOrUndefined) {
            res.status(412).json(new jsonModel(reqUrl, httpMethod, 412, "Some body properties are missing or incorrect"));
        }

        const newBuyerCheck = new buyerCheck({
            checkName: checkName,
            name: name,
            billingCountry: billingCountry,
            shippingCountry: shippingCountry
        });

        await newBuyerCheck.save()
            .then(() => {
                res.status(201).json(new jsonModel(reqUrl, httpMethod, 201, "Buyer check has been created"));
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, buyer check has not been created"));
            })
    }

    static async getAllBuyerChecks(httpMethod, res) {
        const reqUrl = '/api/buyerChecks';

        await buyerCheck.find()
            .then((buyerChecks) => {
                if (buyerChecks.length !== 0) {
                    res.status(200).json({
                        response: new jsonModel(reqUrl, httpMethod, 200, "GET all buyer checks"),
                        buyerChecks: buyerChecks[0]
                    })
                } else {
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No buyer checks found"));
                }
            })
            .catch(() => {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No buyer checks found"));
            })
    }

    static async getBuyerCheckById(checkID, httpMethod, res) {
        const reqUrl = '/api/buyerChecks';

        await buyerCheck.findById( checkID)
            .then((buyerCheckParam) => {
                console.log(buyerCheckParam);
                if (!buyerCheckParam.isNullOrUndefined) {
                    res.status(200).json({
                        response: new jsonModel(reqUrl, httpMethod, 200, "GET buyer check"),
                        buyerCheck: buyerCheckParam
                    })
                } else {
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Buyer check " + checkID + " not found"))
                }
            })
            .catch((error) => {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Buyer check " + checkID + " not found"))
            })
    }

    static async updateBuyerCheck(checkID, httpMethod, res) {
        const reqUrl = "/api/buyerChecks/" + checkID;
    }

    static async deleteBuyerCheckByID(checkID, httpMethod, res) {
        const reqUrl = "/api/buyerChecks/" + checkID;

        await buyerCheck.findById({_id: checkID})
            .then((buyerCheck) => {
                if (buyerCheck == null) {
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Buyer check " + checkID + " not found"));
                }
                else {
                    buyerCheck.remove();
                    res.status(200).json(new jsonModel(reqUrl, httpMethod, 200, "Buyer check has been deleted"));
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(new jsonModel(reqUrl, httpMethod, 500, "Something went wrong, buyer check has not been deleted"))
            })
    }
};