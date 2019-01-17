// Database driver imports
const sql = require('mssql');
// Response model imports
const jsonModel = require('../../models/response/JsonModel');
const merchantCheck = require('../schema/merchantCheck');
const merchantCheckRepo = require('../../data/repository/merchantCheckRepo');
const paymentCheck = require('../schema/paymentCheck');

module.exports = class sqlRepo {

    static async getAllItemsFromSQL(response, requestUrl, httpMethod, query, table) {
        const sqlRequest = new sql.Request();
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
        const sqlRequest = new sql.Request();
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
                    items: recordSet.recordset[0]
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

    static async insertIntoTable(query) {
        const sqlRequest = new sql.Request();

        await sqlRequest.query(query, (error, recordSet) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Insert into table: " + recordSet.recordset);
            }
        });
    }

    static async fireQuery(query, mongoCheckID) {
        const sqlRequest = new sql.Request();
        try {
            await sqlRequest.query(query, (error, recordSet) => {
                if (error) {
                    console.log(error);
                } else {
                    for (let item in recordSet.recordset) {
                        // this.insertIntoTable("INSERT INTO Alerts VALUES(" + recordSet.recordset[item].ID + ", 0,'" + mongoCheckID + "')" );
                        let query = "merge into Alerts T1 " +
                            "using (select " +
                            + recordSet.recordset[item].ID + " id, " +
                            "0 issolved, " +
                            "'" + mongoCheckID + "' " +
                            "controle) T2 on (T1.id = T2.id and T1.controle = T2.controle) " +
                            "when not matched then insert(id, issolved, controle) values(T2.id, T2.issolved, T2.controle);";
                        this.insertIntoTable(query);
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Get all the orders on which merchant checks are triggered
    static async fireMerchantChecksOnSql() {
        try {
            await merchantCheck.find({}, (err, docs) => {
                for (let check in docs) {
                    const mongoCheckID = docs[check]._id;
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

                    sqlRepo.fireQuery(query, mongoCheckID);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Get all the orders on which payment checks are triggered
    static async firePaymentChecksOnSql() {
        try {
            await paymentCheck.find({}, function (err, docs) {
                for (let check in docs) {

                    const mongoCheckID = docs[check]._id;
                    const checkName = docs[check].checkName;
                    const amount = docs[check].amount;
                    const currency = docs[check].currency;
                    const time = docs[check].time;
                    const paymentMethod = docs[check].paymentMethod;
                    if (time === 0 || time === undefined || time === null) {
                        let query =
                            "select o.ID " +
                            "from Orders o " +
                            "inner join Currencies c on o.Currency = c.CurrencyCode " +
                            "inner join Payments p on p.OrderID = o.ID " +
                            "inner join PaymentMethods pm on pm.PaymentMethod = p.PaymentMethod " +
                            "where c.Description = '" + currency + "' AND " +
                            "pm.PaymentMethod = '" + paymentMethod + "' AND " +
                            "o.amount >= " + amount;
                        sqlRepo.fireQuery(query, mongoCheckID);
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
                        sqlRepo.fireQuery(query, mongoCheckID);
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
};

