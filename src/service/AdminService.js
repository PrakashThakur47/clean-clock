const Admin = require('../model/Admin')


exports.getUserbyEmail = async email => {
  email = email.toLowerCase()
  return Admin.findOne({ email })
}
