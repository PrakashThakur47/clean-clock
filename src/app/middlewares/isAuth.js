const jwt = require('jsonwebtoken')

module.exports = async (request, response, next) => {
    const token = request.get('AuthorizationToken')
    let decodedToken
    try {
        let secret_key
        switch (request.originalUrl.split('/')[1]) {
            case 'api':
                secret_key = `${process.env.JWT_SECRET_KEY}`
                break
            case 'admin':
                secret_key = `${process.env.JWT_ADMIN_SECRET_KEY}`
                break
        }
        decodedToken = jwt.verify(token, secret_key)

        request.user = {
            userId: decodedToken.id,
            name: decodedToken?.name,
        }
        next()
    } catch (error) {
        next(error)
    }
}
