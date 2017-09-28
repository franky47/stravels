import { StyleSheet } from 'react-native'
import { Metrics } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    right: Metrics.baseMargin
  }
})
