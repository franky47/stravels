const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Credentials
const serviceKey = 'stravels-5d45d-firebase-adminsdk-qakvx-b2a0c45713'
const serviceAccount = functions.config().stravels[serviceKey]

const utility = require('../utility')

admin.initializeApp({
  databaseURL: 'https://stravels-5d45d.firebaseio.com',
  credential: admin.credential.cert(serviceAccount)
})

// HTTPS Entrypoint --

module.exports = functions.https.onRequest((request, response) => {
  const validateInput = () => utility.validateInput(request, {
    allowedMethod: 'POST',
    allowEmptyBody: false,
    requiredKeys: ['uid']
  })
  const generateToken = (data) => {
    return admin.auth().createCustomToken(data.uid, {})
      .catch((error) => {
        utility.throwError(500, `Error received in createCustomToken: ${error.toString()}`)
      })
  }
  return Promise.resolve()
    .then(validateInput)
    .then(generateToken)
    .then((token) => {
      response.status(200).json(token)
    })
    .catch((error) => {
      if (error.status) {
        response.status(error.status).json(error.message)
      } else {
        response.status(500).json(error.message)
      }
    })
})
