import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,

    // Border
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.separator,
    borderRadius: Metrics.buttonRadius
  },

  icon: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold'
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
