const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const User = require('../data/schema/user');

chai.should();
chai.use(chaiHttp);

mongoose.Promise = global.Promise;

before((done) => {
    const DATABASE_NAME = 'test';
    const dbUser = process.env.dbUser;
    const dbPassword = process.env.dbPassword;
    const CONNECTION_STRING = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@cm-a2-c2mt3.mongodb.net/'+ DATABASE_NAME +'?retryWrites=true';

    // Establish a connection with the cm-a2 database (hosted on Atlas)
    mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
    // Print a message after the connection with the database has been made
    mongoose.connection
        .once('open', () => {
            console.log("Connected to the database " + DATABASE_NAME);
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

let token;
let testUser;

const TEST_USER_NAME = 'tester';
const TEST_USER_PASS = 'soepersiekret';

beforeEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        testUser = new User({
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
    })
});

module.exports = {
    username: TEST_USER_NAME,
    password: TEST_USER_PASS,
    token: token
};