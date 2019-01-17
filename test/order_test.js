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
const TEST_ORDER_ID = '498570766'; // <-- change this value

let token = helper.token; // <-- change this value by import

describe('Order:', () => {
    before((done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                username: helper.username,
                password: helper.password
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    it('GET: \nShould return ONE order when performing a GET with specific ID', (done) => {
        console.log(token);
        chai.request(server)
            .get('/api/orders/' + TEST_ORDER_ID)
            .set('X-Access-Token', token)
            .end((err, res) => {
                console.log(res.body);
                res.body.items.should.have.lengthOf(1);
                res.should.have.status(200);
                done();
            })
    });
});