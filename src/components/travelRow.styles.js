import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: Metrics.baseMargin,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 15,
    color: Colors.text
  },
  descriptionText: {
    color: Colors.secondary,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  }
})
