import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin
  },
  item: {
    backgroundColor: 'white'
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 255, 0, 0.25)'
  }
})
