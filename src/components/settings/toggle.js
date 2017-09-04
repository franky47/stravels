import React from 'react'
import { View, Text, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './toggle.styles'

const defaultProps = {
  label: '',
  disabled: false,
  value: false,
  onChange: () => {},
  icon: null
}

export default function ToggleSetting (props = defaultProps) {
  const p = {...defaultProps, ...props}
  return (
    <View style={styles.mainContainer}>
      { p.icon &&
        <Icon
          name={p.icon}
          style={styles.icon}
        />
      }
      <Text style={styles.label}>
        {p.label}
      </Text>
      <Switch
        style={styles.switch}
        disabled={p.disabled}
        onValueChange={p.onChange}
        value={p.value}
      />
    </View>
  )
}
