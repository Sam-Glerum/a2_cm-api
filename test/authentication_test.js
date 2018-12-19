const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../data/schema/user');
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

const TEST_USER_NAME = 'tester';
const TEST_USER_PASS = 'soepersiekret';

describe('Registration & Login:', () => {
    beforeEach((done) => {
        const testUser = new User({
            username: TEST_USER_NAME,
            email: 'tester@test.com',
            password: TEST_USER_PASS
        });

        testUser.save()
            .then(() => {
                done();
            })
    });

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
                res.should.not.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('LOGIN: \nShould throw an error when wrong password is provided.', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                username: TEST_USER_NAME,
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
                password: TEST_USER_PASS
            })
            .end((err, res) => {
                res.should.not.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('LOGIN: \nShould ')
});