const Admin = require('../model/Admin')

/**
 *
 * @param email
 */
exports.getUserbyEmail = async email => {
  email = email.toLowerCase()
  return Admin.findOne({ email })
}
