// Imports..
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../data/schema/user');
const mongoose = require('mongoose');

// Setup chai for tests and requests being sent through chai-http.
chai.should();
chai.use(chaiHttp);

// TEST input
const TEST_COUNTRY_ID = '0'; // <-- change this value

const token = '0'; // <-- change this value by import

xdescribe('Country:', () => {
    it('GET: \nShould return ONE order when performing a GET with specific ID', (done) => {
        chai.request(server)
            .get('/api/countries/' + TEST_COUNTRY_ID) // could have different path than countries
            .set('X-Access-Token', token)
            .end((err, res) => {
                res.body.country.should.have.lengthOf(1);
                res.should.have.status(200);
                done();
            });
    });
});