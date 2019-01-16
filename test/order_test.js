// Imports...
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../data/schema/user');
const mongoose = require('mongoose');
const helper = require('./test_helper');

// Setup chai for tests and requests being sent through chai-http.
chai.should();
chai.use(chaiHttp);

// TEST input
const TEST_ORDER_ID = '498499090'; // <-- change this value

const token = helper.token; // <-- change this value by import

describe('Order:', () => {
    it('GET: \nShould return ONE order when performing a GET with specific ID', (done) => {
        console.log(token);
        chai.request(server)
            .get('/api/orders/' + TEST_ORDER_ID)
            .set('X-Access-Token', token)
            .end((err, res) => {
                res.body.order.should.have.lengthOf(1);
                res.should.have.status(200);
                done();
            })
    });
});