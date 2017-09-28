import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  sectionHeader: {
    flex: 1,
    height: 30,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator
  },
  sectionHeaderText: {
    color: Colors.text,
    fontWeight: '700'
  },
  separator: {
    height: 1,
    backgroundColor: Colors.separator
  }
})
