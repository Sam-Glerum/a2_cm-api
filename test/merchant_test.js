const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../data/schema/user');
const mongoose = require('mongoose');

// Setup chai for tests and requests being sent through chai-http.
chai.should();
chai.use(chaiHttp);

// TEST input
const TEST_MERCHANT_ID = '0094cc359258ae2a28d545bd1f77b788';

const TEST_USER_NAME = 'tester';
const TEST_USER_PASS = 'soepersiekret';
let token;

xdescribe('Merchant:', () => {

    // Test database is emptied between tests,
    // the beforeEach statement below adds a default user to the database before every test and after the database is emptied.
    beforeEach((done) => {
        const testUser = new User({
            username: TEST_USER_NAME,
            email: 'tester@test.com',
            password: TEST_USER_PASS
        });

        token = '';

        testUser.save()
            .then(() => {
                chai.request(server)
                    .post('/api/login')
                    .send({
                        username: TEST_USER_NAME,
                        password: TEST_USER_PASS
                    })
                    .end((err, res) => {
                        token = res.body.token;
                        done();
                    });
            });
    });

    it('GET: \nShould return ONE merchant when performing a GET with specific ID', (done) => {
        chai.request(server)
            .get('/api/merchants/' + TEST_MERCHANT_ID)
            .set('X-Access-Token', token)
            .end((err, res) => {
                res.body.merchant.should.have.lengthOf(1);
                res.should.have.status(200);
                done();
            });
    });
});