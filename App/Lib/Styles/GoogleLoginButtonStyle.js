import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: Metrics.buttonRadius,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  icon: {
    height: 25,
    width: 25,
    position: 'absolute',
    left: 15
  },
  text: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '700',
    fontSize: 15
  }
})
