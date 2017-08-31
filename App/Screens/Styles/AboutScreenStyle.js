import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin
  },
  section: {
    color: Colors.main
  },
  dependencyList: {
  },
  dependencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20
  },
  dependencyName: {

  },
  dependencyVersion: {
    color: Colors.secondary,
    fontFamily: Fonts.type.mono,
    fontSize: 12
  }
})
