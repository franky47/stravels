import { StyleSheet } from 'react-native'
import { Metrics } from '../themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    right: Metrics.baseMargin
  }
})
