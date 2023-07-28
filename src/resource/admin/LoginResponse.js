const jwt = require('jsonwebtoken')
const Resource = require('resources.js')

class LoginResponse extends Resource {
  /**
   *
   */
  toArray () {
    const payload = {
      id: this._id,
      email: this.email
    }
    const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET_KEY)
    return {
      token,
      user: payload
    }
  }
}

module.exports = LoginResponse
