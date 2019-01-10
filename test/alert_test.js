const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../data/schema/user');
const mongoose = require('mongoose');
const helper = require('./test_helper');

// Setup chai for tests and requests being sent
chai.should();
chai.use(chaiHttp);

// TEST input
const TEST_ALERT_ID = '498561231';

const TEST_USER_NAME = helper.user.username;

describe('JUNK', () => {
    it('TESTS FOR PROPERTY', () => {
        console.log(TEST_USER_NAME);
    });
});

