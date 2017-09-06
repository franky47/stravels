import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  row: {
    height: Metrics.listRowHeight.default,
    paddingHorizontal: Metrics.baseMargin
  },
  text: {
    color: Colors.text
  }
})
