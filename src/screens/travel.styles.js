import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  backToSummaryButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 24
  },
  titleBar: {
    flexDirection: 'column',
    marginVertical: Metrics.baseMargin * 0.5,
    paddingBottom: Metrics.baseMargin * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator
  },
  title: {
    color: Colors.text,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '100'
  },
  date: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '500'
  }
})
