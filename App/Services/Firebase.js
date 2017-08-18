import * as Firebase from 'firebase'
import Secrets from 'react-native-config'

const firebaseConfig = {
  projectId:    Secrets.FIREBASE_PROJECT_ID,
  apiKey:       Secrets.FIREBASE_API_KEY,
  authDomain:   Secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL:  Secrets.FIREBASE_DATABASE_URL
}
const firebase = Firebase.initializeApp(config)

export default firebase
