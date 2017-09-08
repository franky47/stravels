import React from 'react'
import { View, Text, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './toggle.styles'

export default function ToggleSetting ({ icon, label, disabled, onChange, value }) {
  return (
    <View style={styles.mainContainer}>
      { icon &&
        <Icon
          name={icon}
          style={styles.icon}
        />
      }
      <Text style={styles.label}>
        {label}
      </Text>
      <Switch
        style={styles.switch}
        disabled={disabled}
        onValueChange={onChange}
        value={value}
      />
    </View>
  )
}

ToggleSetting.defaultProps = {
  label: '',
  disabled: false,
  value: false,
  onChange: () => {},
  icon: null
}
