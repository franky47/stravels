import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: Metrics.baseMargin
  },
  icon: {
    fontSize: 20,
    marginRight: Metrics.baseMargin,
    color: Colors.text
  },
  label: {
    fontSize: 17,
    color: Colors.text
  },
  switch: {
    position: 'absolute',
    right: Metrics.baseMargin
  }
})
