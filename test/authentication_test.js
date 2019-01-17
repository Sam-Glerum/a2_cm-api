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

// CONTAINS REGISTRATION & LOGIN TESTS.
describe('Registration & Login:', () => {

    // Test database is emptied between tests,
    // the beforeEach statement below adds a default user to the database before every test and after the database is emptied.
    /**beforeEach((done) => {
        const testUser = new User({
            username: helper.username,
            email: 'tester@test.com',
            password: helper.password
        });

        testUser.save()
            .then(() => {
                done();
            })
    }); */

    // TESTS FOR REGISTER ROUTE.
    it('REGISTER: \nShould return an error on GET request.', (done) => {
        chai.request(server)
            .get('/api/register')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('REGISTER: \nShould throw an error when no username is provided.', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                email: "cryhunterz@aoc.com",
                password: "R4dicalFist"
            })
            .end((err, res) => {
                res.should.not.have.status(200);            // OK status, does not check whether the route reaches the repository or not.
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    // TESTS FOR LOGIN ROUTE.
    it('LOGIN: \nShould return an error on GET request.', (done) => {
        chai.request(server)
            .get('/api/login')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('LOGIN: \nShould throw an error when wrong password is provided.', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                username: helper.username,
                password: "wrongpassword"
            })
            .end((err, res) => {
                res.should.not.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('LOGIN: \nShould throw an error when wrong username is provided.', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                username: "wrongtester",
                password: helper.password
            })
            .end((err, res) => {
                res.should.not.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
});