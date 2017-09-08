import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'

export default function NavToolbarTouchable ({ onPress, disabled, children }) {
  return (
    <TouchableHighlight
      underlayColor='transparent'
      onPress={onPress}
      disabled={disabled}
      style={styles.mainContainer}
    >
      { children }
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 40,
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

NavToolbarTouchable.defaultProps = {
  disabled: false,
  onPress: () => {}
}
