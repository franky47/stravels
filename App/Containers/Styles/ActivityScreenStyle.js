import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    // backgroundColor: Colors.fire,
    // marginVertical: 0//Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.strava,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  activityRow: {
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
  activityIcon: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius
  },
  activityTextContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  activityTitle: {
    fontWeight: 'bold'
  },
  activityDescriptionContainer: {
    flex: 1,
    marginTop: Metrics.smallMargin,
    flexDirection: 'row'
  },
  activityDescriptionIcon: {
    marginRight: Metrics.smallMargin,
    color: Colors.secondary,
    fontSize: 14
  },
  activityDescriptionText: {
    marginRight: Metrics.baseMargin,
    color: Colors.secondary,
    fontSize: Fonts.size.small
  }
})
