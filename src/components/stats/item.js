import React from 'react'
import { View, Text } from 'react-native'

import styles from './item.styles'

export default function StatItem ({ label, value, unit }) {
  return (
    <View style={styles.mainContainer}>
      <Text>
        <Text style={styles.value}>
          {value}
        </Text>
        {' '}
        <Text style={styles.unit}>
          {unit.toUpperCase()}
        </Text>
      </Text>
      <Text style={styles.label}>
        {label.toUpperCase()}
      </Text>
    </View>
  )
}
