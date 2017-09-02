import * as Firebase from 'firebase'
import Secrets from 'react-native-config'
import axios from 'axios'

const firebaseConfig = {
  projectId: Secrets.FIREBASE_PROJECT_ID,
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: Secrets.FIREBASE_DATABASE_URL
}
const firebase = Firebase.initializeApp(firebaseConfig)

const generateJwt = (uid) => {
  const url = 'https://us-central1-stravels-5d45d.cloudfunctions.net/jwtMint'
  return axios.post(url, { uid: uid.toString() })
    .then((response) => response.data)
}
export const loginWithStrava = (stravaUser) => {
  return generateJwt(stravaUser.id)
    .then((jwt) => firebase.auth().signInWithCustomToken(jwt))
    .then((user) => user.updateEmail(stravaUser.email).then(() => user))
    .then((user) => user.updateProfile({
      displayName: `${stravaUser.firstname} ${stravaUser.lastname}`,
      photoURL: stravaUser.profile
    }).then(() => user))
}

export default firebase
