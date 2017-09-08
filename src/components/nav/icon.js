import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavToolbarTouchable from './touchable'

export default function NavToolbarIcon (props) {
  return (
    <NavToolbarTouchable {...props} >
      <Icon
        name={props.icon}
        size={props.size}
        color={props.disabled ? props.disabledColor : props.color}
      />
    </NavToolbarTouchable>
  )
}

NavToolbarIcon.defaultProps = {
  size: 24,
  disabledColor: '#ccc',
  color: '#333'
}
