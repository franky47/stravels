import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../themes'

const stackedStyle = StyleSheet.create({
  container: {
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
const inlineStyle = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  value: {

  },
  unit: {

  },
  label: {

  }
})

export default (inline) => inline ? inlineStyle : stackedStyle
