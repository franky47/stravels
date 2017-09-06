import React from 'react'
import { View, Text } from 'react-native'

import getStyles from './item.styles'

export default (props) => {
  const styles = getStyles(props.inline)
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.value}>{props.value}</Text>
        { props.unit &&
          <Text style={styles.unit}>{' ' + props.unit.toUpperCase()}</Text>
        }
      </Text>
      <Text style={styles.label}>{props.label.toUpperCase()}</Text>
    </View>
  )
}
