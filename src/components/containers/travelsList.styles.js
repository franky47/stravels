import { StyleSheet } from 'react-native'
import { Colors } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.separator
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#555'
  },
  emptyCallToAction: {
  }
})
