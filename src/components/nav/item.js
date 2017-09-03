import React from 'react'
import { TouchableHighlight } from 'react-native'

const defaultProps = {
  disabled: false,
  onPress: () => {}
}

export default function NavToolbarItem (props = defaultProps) {
  const p = {...defaultProps, ...props}
  return (
    <TouchableHighlight
      underlayColor='transparent'
      onPress={p.onPress}
      disabled={p.disabled}
    >
      { props.children }
    </TouchableHighlight>
  )
}
