// Database driver import
const sql = require('mssql');
// Response model import
const jsonModel = require('../../models/response/JsonModel');

const sqlRequest = new sql.Request();

module.exports = class merchantCategoryRepo {

    static async getAllMerchantCategoryCodes(httpMethod, res) {
        let reqUrl = '/api/merchantCategories';

        try {
            await sqlRequest.query('select * from MerchantCategoryCodes', (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "No merchant categories found"));
                }

                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET all merchant categories"),
                    merchantCategories: recordSet.recordset
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    static async getCategoryInfoByCategoryCode(categoryCode, httpMethod, res) {
        let reqUrl = '/api/merchantCategories/' + categoryCode;
        try {
            await sqlRequest.query('select * from MerchantCategoryCodes where Mcc = ' + categoryCode, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    res.status(404).json(new jsonModel(reqUrl, httpMethod, 404, "Merchant category code " + categoryCode + "not found"));
                }
                res.status(200).json({
                    response: new jsonModel(reqUrl, httpMethod, 200, "GET category code " + categoryCode),
                    categoryCode: recordSet.recordset
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

};