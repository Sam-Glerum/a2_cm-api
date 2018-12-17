const Isemail = require('isemail');

module.exports = class CheckObjects {
    // Returns true if the given object is a valid login
    static isValidLogin(object) {
        const tmp =
            object && typeof object == "object" &&
            object.username && typeof object.username == "string" &&
            object.password && typeof object.password == "string";
        return tmp == undefined ? false : tmp;
    }

    // Returns true if the given object is a valid register
    static isValidRegistration(object) {
        const tmp =
            object && typeof object == "object" &&
            object.username && typeof object.username == "string" && object.username.length >= 2 &&
            object.email && typeof object.email == "string" && Isemail.validate(object.email) &&
            object.password && typeof object.password == "string";
        return tmp == undefined ? false : tmp;
    }

    static isValidPasswordChange(object) {
        const tmp =
            object && typeof object == "object" &&
            object.password && typeof object.password == "string" &&
            object.newPassword && typeof object.newPassword == "string";
        return tmp == undefined ? false : tmp;
    }
};