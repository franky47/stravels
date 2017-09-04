import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin
  },
  image: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    marginRight: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 15,
    color: Colors.text
  },
  descriptionContainer: {
    flex: 1,
    marginTop: Metrics.smallMargin,
    flexDirection: 'row'
  },
  descriptionIcon: {
    marginRight: Metrics.smallMargin,
    color: Colors.secondary,
    fontSize: 14
  },
  descriptionText: {
    marginRight: Metrics.baseMargin,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  }
})
