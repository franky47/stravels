import React from 'react'
import { View } from 'react-native'

import styles from './toolbar.styles'

export const ToolbarItem = (item) => {
  return (
    <View style={styles.item}>
      { item }
    </View>
  )
}

export default function NavToolbar (props) {
  return (
    <View style={styles.container} >
      { React.Children.map(props.children, (child) => ToolbarItem(child)) }
    </View>
  )
}
