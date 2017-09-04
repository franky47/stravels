import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  row: {
    height: Metrics.listRowHeight.normal,
    paddingHorizontal: Metrics.baseMargin
  },
  text: {
    color: Colors.text
  }
})
