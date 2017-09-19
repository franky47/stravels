import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Metrics.baseMargin
  },
  row: {
    flex: 1,
    padding: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.listRowHeight.large,
    backgroundColor: Colors.highlightUnderlay,
    borderRadius: Metrics.buttonRadius,
    borderWidth: 1,
    borderColor: Colors.highlightUnderlay
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: Metrics.listRowHeight.large,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.highlightUnderlay,
    borderWidth: 1,
    borderColor: Colors.highlightUnderlay
  },
  text: {
    color: Colors.text
  }
})
