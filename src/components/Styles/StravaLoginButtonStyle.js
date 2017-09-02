import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.strava,
    height: Metrics.buttonHeight,
    justifyContent: 'center',
    borderRadius: Metrics.buttonRadius
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  }
})
