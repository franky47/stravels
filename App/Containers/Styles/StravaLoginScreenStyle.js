import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    flex: 1,
    padding: Metrics.baseMargin,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: Colors.strava,
    height: Metrics.buttonHeight,
    justifyContent: 'center',
    borderRadius: Metrics.buttonRadius,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  }
})
