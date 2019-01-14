// Response model imports
const jsonModel = require('../../models/response/JsonModel');
// Entity imports
const buyerCheck = require('../schema/buyerCheck');

module.exports = class BuyerCheckRepo {

    static async createBuyerCheck(checkName, name, billingCountry, shippingCountry, httpMethod, res) {
        const reqUrl = '/api/buyerChecks';

        if (name.isNullOrUndefined || billingCountry.isNullOrUndefined || shippingCountry.isNullOrUndefined) {
            res.status(412),json(new jsonModel(reqUrl, httpMethod, 412, "Some body properties are missing or incorrect"));
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

        await buyerCheck.find({})
            .then((buyerChecks) => {
                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all buyer checks"),
                    items: buyerChecks
                })
            })
            .catch(() => {
                res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No buyer checks found"));
            })
    }
};