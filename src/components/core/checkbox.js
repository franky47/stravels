import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@stravels/themes'

export default function Checkbox ({
  onPress, checked, disabled,
  size, style,
  colorOn, colorOff,
  colorDisabledOn, colorDisabledOff
}) {
  const color = disabled ? (checked ? colorDisabledOn : colorDisabledOff)
                         : (checked ? colorOn : colorOff)
  return <Icon
    onPress={disabled ? () => {} : onPress}
    style={style}
    name={checked ? 'check-box' : 'check-box-outline-blank'}
    color={color}
    size={size}
  />
}

Checkbox.defaultProps = {
  onPress: () => {},
  checked: false,
  size: 24,
  colorOn: Colors.checkboxOn,
  colorOff: Colors.checkboxOff,
  colorDisabledOn: Colors.secondary,
  colorDisabledOff: Colors.secondary
}
