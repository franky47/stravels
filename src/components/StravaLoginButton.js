import React from 'react'
import { Text, TouchableHighlight } from 'react-native'

import styles from './Styles/StravaLoginButtonStyle'

const StravaLoginButton = (props) => (
  <TouchableHighlight
    underlayColor='#FC601D'
    style={styles.button}
    onPress={props.onPress}
  >
    <Text style={styles.buttonText}>Login with Strava</Text>
  </TouchableHighlight>
)

export default StravaLoginButton
