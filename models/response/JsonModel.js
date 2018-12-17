class JsonResponseModel {

    constructor(url, method, statusCode, apiVersion, message) {
        this.url = url;
        this.method = method;
        this.statusCode = statusCode;
        this.apiVersion = apiVersion;
        this.message = message;
    };
}
module.exports = JsonResponseModel;