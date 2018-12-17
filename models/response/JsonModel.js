class JsonResponseModel {

    constructor(url, method, statusCode, message) {
        this.url = url;
        this.method = method;
        this.statusCode = statusCode;
        this.message = message;
    };
}
module.exports = JsonResponseModel;