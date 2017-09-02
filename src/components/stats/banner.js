import React from 'react'
import { View } from 'react-native'
import StatItem from './StatItem'

import styles from './banner.styles'

export default (props) => {
  return (
    <View style={styles.container} >
      <View style={styles.row}>
        <StatItem label='distance' value={42.12} unit='km' />
        <StatItem label='moving time' value={28.3} unit='h' />
      </View>
      <View style={styles.row}>
        <StatItem label='avg speed' value={12.2} unit='km/h' />
        <StatItem label='elevation gain' value={6012} unit='m' />
        <StatItem label='max speed' value={42.12} unit='km/h' />
      </View>
    </View>
  )
}
