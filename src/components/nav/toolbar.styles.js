import { StyleSheet } from 'react-native'
import { Metrics } from '@stravels/themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: Metrics.baseMargin
  },
  item: {
    marginLeft: Metrics.baseMargin
  }
})
