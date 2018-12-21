const moment = require('moment');
const jwt = require('jwt-simple');

// Encode (from username to token)
function encodeToken(username) {
    const payload = {
        exp: moment().add(5, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };

    return jwt.encode(payload, process.env.secretKey, null, null)
}

// Decode (from token to username)
function decodeToken(token, callback) {
    try {
        const payload = jwt.decode(token, process.env.secretKey, null, null);

        const now = moment.now();

        // Check if the token is expired
        if (now > payload.exp) {
            console.log(now + ' - ' + payload.exp);
            console.log('Token has expired');
        }

        callback(null, payload);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};