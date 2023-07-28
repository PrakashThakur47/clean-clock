const Constants = require('../config/constants');

module.exports = (_request, response, _next, status, messageCode, data) => {
    response.status(200).json({
        status: status,
        statusCode: messageCode,
        message: Constants.response_code[messageCode],
        data: data,
    });
};