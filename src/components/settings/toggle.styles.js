import { StyleSheet } from 'react-native'
import { Metrics } from '../../themes'

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: Metrics.baseMargin
  },
  icon: {
    fontSize: 20,
    marginRight: Metrics.baseMargin
  },
  label: {
    fontSize: 17
  },
  switch: {
    position: 'absolute',
    right: Metrics.baseMargin
  }
})
