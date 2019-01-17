// Express imports
const express = require('express');
const router = express.Router();
// Repository imports
const sqlRepo = require('../../data/repository/sqlRepo');

router.get('/', (req, res) => {
    sqlRepo.getAllItemsFromSQL(
        res,
        '/api/orders',
        'GET',
        'select * from Orders',
        'Orders'
    )
});

router.get('/:orderID', (req, res) => {
    let orderId = req.params.orderID;
    // Oude query: 'select * from Orders where ID = ' + orderId,
    let query = " SELECT Orders.*, Payments.ID as PaymentID, Payments.MerchantAmount, Payments.CreditCardBin, Payments.Status, Payments.StatusDetails, Payments.PaymentMethod, Payments.OrderId, Payments.PaymentCreatedOn,  Merchants.Name, Merchants.City, Merchants.Country, Merchants.OrganizationID, Merchants.MerchantCategoryCode\n" +
        "FROM Orders\n" +
        "join Payments on Orders.ID = Payments.OrderID\n" +
        "join Merchants on Orders.MerchantID = Merchants.ID\n" +
        "WHERE Orders.ID = " + orderId;

    sqlRepo.getSingleItemFromSQL(
        res,
        '/api/orders/' + orderId,
        'GET',
        query,
        'Orders'
    )
});


module.exports = router;