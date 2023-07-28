const jwt = require('jsonwebtoken')
const Resource = require('resources.js')

/**
 */
class LoginResponse extends Resource {
  /**
   *
   */
  toArray () {
    const payload = {
      id: this._id,
      name: this.name || null
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    return {
      token,
      user: payload
    }
  }
}

module.exports = LoginResponse
