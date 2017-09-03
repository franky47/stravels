import React from 'react'
import NavToolbarItem from './item'
import Icon from 'react-native-vector-icons/MaterialIcons'

const defaultProps = {
  disabledColor: '#ccc',
  color: '#333'
}

export default function NavToolbarIcon (props = defaultProps) {
  const p = {...defaultProps, ...props}
  return (
    <NavToolbarItem {...props} >
      <Icon
        name={props.icon}
        size={24}
        color={p.disabled ? p.disabledColor : p.color}
      />
    </NavToolbarItem>
  )
}
