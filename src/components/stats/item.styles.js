import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '@stravels/themes'

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  value: {
    ...Fonts.style.h4,
    fontSize: 24,
    color: Colors.text
  },
  unit: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa'
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#aaa'
  }
})
