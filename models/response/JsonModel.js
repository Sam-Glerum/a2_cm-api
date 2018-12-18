const config = require('../../config/config');
const apiVersion = config.api_version;

class JsonResponseModel {

    constructor(url, method, statusCode, message) {
        this.url = url;
        this.method = method;
        this.statusCode = statusCode;
        this.apiVersion = apiVersion;
        this.message = message;
    };
}
module.exports = JsonResponseModel;