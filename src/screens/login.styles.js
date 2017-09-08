import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics } from '@stravels/themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    flex: 1
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo: {
    margin: Metrics.baseMargin
  },
  uiContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonContainer: {
    margin: Metrics.baseMargin
  },
  spinner: {
    marginTop: Platform.select({
      ios: 18,
      android: 18 // todo: check on Android
    })
  },
  links: {
    flexDirection: 'row'
  },
  link: {
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.75)',
    textDecorationLine: 'underline'
  },
  error: {
    color: 'rgba(255, 255, 255, 0.75)'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: Metrics.baseMargin
  },
  footerText: {
    color: 'white'
  }
})
