// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');
const merchantCheck = require('../schema/merchantCheck');
const paymentCheck = require('../schema/paymentCheck');

const sqlRequest = new sql.Request();

module.exports = class sqlRepo {

    static async getAllItemsFromSQL(response, requestUrl, httpMethod, query, table) {
        try {
            await sqlRequest.query(query, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    response.status(404).json(new jsonModel(
                        requestUrl,
                        httpMethod,
                        404,
                        "No results found"
                    ))
                }

                response.status(200).json({
                    response: new jsonModel(
                        requestUrl,
                        httpMethod,
                        200,
                        "GET all items from " + table
                    ),
                    items: recordSet.recordset
                })
            })
        } catch (error) {
            console.log(error);
            response.status(500).json(new jsonModel(
                requestUrl,
                httpMethod,
                500,
                "Something went wrong, please try again"
            ));
        }
    }

    static async getSingleItemFromSQL(response, requestUrl, httpMethod, query, table, itemID) {
        try {
            await sqlRequest.query(query, (error, recordSet) => {
                if (error) {
                    console.log(error);
                    response.status(404).json(new jsonModel(
                        requestUrl,
                        httpMethod,
                        404,
                        "No results found"
                    ))
                }

                response.status(200).json({
                    response: new jsonModel(
                        requestUrl,
                        httpMethod,
                        200,
                        "GET item " + itemID + " from " + table
                    ),
                    items: recordSet.recordset
                })
            })

        } catch (error) {
            console.log(error);
            response.status(500).json(new jsonModel(
                requestUrl,
                httpMethod,
                500,
                "Something went wrong, please try again"
            ));
        }
    }

    static async fireMerchantChecksOnSql() {
        try {
            await merchantCheck.find({}, (err, docs) => {
                for (let check in docs) {
                    const countries = docs[check].countries;
                    const category = docs[check].category;
                    let query =
                        "Select o.ID " +
                        "From Orders o " +
                        "left join Merchants m on o.MerchantID = m.ID " +
                        "left join Countries c on m.Country = c.IsoCode " +
                        "left join MerchantCategoryCodes mcc on m.MerchantCategoryCode = mcc.Mcc " +
                        "where ";
                    for (let i in countries) {
                        if (!isNaN(i)) {
                            query += "c.Name = '" + countries[i] + "' AND "
                        }
                    }
                    query += "mcc.Description = '" + category + "'";
                    this.fireQuery(query);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async firePaymentChecksOnSql() {
        try {
            await paymentCheck.find({}, (err, docs) => {
                for (let check in docs) {
                    const amount = docs[check].amount;
                    const currency = docs[check].currency;
                    const time = docs[check].time;
                    const paymentMethod = docs[check].paymentMethod
                    if (time === 0) {
                        let query =
                            "select o.ID " +
                            "from Orders o " +
                            "inner join Currencies c on o.Currency = c.CurrencyCode " +
                            "inner join Payments p on p.OrderID = o.ID " +
                            "inner join PaymentMethods pm on pm.PaymentMethod = p.PaymentMethod " +
                            "where c.Description = '" + currency + "' AND " +
                            "pm.PaymentMethod = '" + paymentMethod + "' AND " +
                            "o.amount >= " + amount;
                        // console.log(query);
                    } else {
                        let query = "select o.ID " +
                            "from Orders o " +
                            "inner join Currencies c on o.Currency = c.CurrencyCode " +
                            "inner join Payments p on p.OrderID = o.ID " +
                            "inner join PaymentMethods pm on pm.PaymentMethod = p.PaymentMethod " +
                            "where c.Description = '" + currency + "' AND " +
                            "pm.PaymentMethod = '" + paymentMethod + "' AND " +
                            "o.OrderCreatedOn " +
                            "BETWEEN dateadd(hour, - " + time + ", o.OrderCreatedOn) " +
                            "AND o.OrderCreatedOn " +
                            "group by o.id " +
                            "having sum(o.Amount * c.ExchangeRateToEuro) >= " + amount;
                        // console.log(query);
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async fireQuery(query) {
        const newSqlRequest = new sql.Request();
        await newSqlRequest.query(query, (error, recordSet) => {
            if (error) {
                console.log(error);
            } else {
                console.log(recordSet.recordset);
            }
        });
    }
};