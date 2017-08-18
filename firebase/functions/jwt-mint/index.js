const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./stravels-5d45d-firebase-adminsdk-qakvx-b2a0c45713.json');

module.exports = functions.https.onRequest((request, response) => {

  const throwError = (status, message) => {
    throw { status, error: message }
  }

  const validateInput = () => {
    const data = request.body
    if (request.method !== 'POST') {
      throwError(403, "Only POST method is allowed.")
    }
    if (!data) {
      throwError(400, "Empty request body.")
    }
    if (!data.uid) {
      throwError(400, "Field 'uid' is missing.")
    }
    if (!data.email) {
      throwError(400, "Field 'email' is missing.")
    }
    if (!data.displayName) {
      throwError(400, "Field 'displayName' is missing.")
    }
    return data
  }
  const startAdmin = (data) => {
    admin.initializeApp({
      databaseURL: 'https://stravels-5d45d.firebaseio.com',
      credential: admin.credential.cert(serviceAccount)
    })
    return data
  }
  const generateToken = (data) => {
    const claims = {
      email:        data.email,
      displayName:  data.displayName,
      provider:     'Strava'
    }
    return admin.auth().createCustomToken(data.uid, claims)
      .catch((error) => {
        throwError(500, `Error received in createCustomToken: ${error.toString()}`)
      })
  }
  return Promise.resolve()
    .then(validateInput)
    .then(startAdmin)
    .then(generateToken)
    .then((token) => {
      response.status(200).json(token)
    })
    .catch((error) => {
      response.status(error.status).json(error)
    })
})
