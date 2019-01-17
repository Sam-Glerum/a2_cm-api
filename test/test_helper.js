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

let token = '';
let testUser;

const TEST_USER_NAME = 'cmtester';
const TEST_USER_MAIL = 'cmtester@cm.nl';
const TEST_USER_PASS = 'S3CR3T';

before((done) => {
    chai.request(server)
        .post('/api/register')
        .send({
            username: TEST_USER_NAME,
            email: TEST_USER_MAIL,
            password: TEST_USER_PASS
        })
        .end((err, res) => {
            done();
        });
});

after((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        done();
    });
});

module.exports = {
    username: TEST_USER_NAME,
    password: TEST_USER_PASS,
    token: token
};