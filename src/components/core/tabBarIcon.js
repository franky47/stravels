import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@stravels/themes'

export default function TabBarIcon ({ name, tintColor, size }) {
  return <Icon
    name={name}
    size={size}
    style={{
      color: tintColor
    }}
  />
}
TabBarIcon.defaultProps = {
  size: 28,
  tintColor: Colors.main
}
