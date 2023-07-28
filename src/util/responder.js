const Constants = require('../config/constants')

/**
 *
 * @param _request
 * @param response
 * @param _next
 * @param status
 * @param messageCode
 * @param data
 */
module.exports = (_request, response, _next, status, messageCode, data) => {
  response.status(200).json({
    status,
    statusCode: messageCode,
    message: Constants.response_code[messageCode],
    data
  })
}
