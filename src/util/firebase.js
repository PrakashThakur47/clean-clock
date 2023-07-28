const serviceAccount = require('../../firebase.json')
const admin = require('firebase-admin')
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

exports.getUserDataByToken = async (token) => {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
}