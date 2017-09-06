import React from 'react'
import { View } from 'react-native'
import StatItem from './item'

// Styles
import { prettifyStats } from '@stravels/transforms/prettify'
import styles from './banner.styles'

export default (props) => {
  const stats = prettifyStats(props.stats)
  return (
    <View style={styles.container} >
      <View style={styles.row}>
        <StatItem label='distance' {...(stats.distance)} />
        <StatItem label='moving time' {...(stats.moving_time)} />
      </View>
      <View style={styles.row}>
        <StatItem label='avg speed' {...(stats.average_speed)} />
        <StatItem label='elevation gain' {...(stats.total_elevation_gain)} />
        <StatItem label='max speed' {...(stats.max_speed)} />
      </View>
    </View>
  )
}
