import React from 'react'
import { View } from 'react-native'
import StatItem from './item'

// Styles
import { prettifyStats } from '@stravels/transforms/prettify'
import styles from './banner.styles'

export default function StatsBanner ({ stats }) {
  const pretty = prettifyStats(stats)
  return (
    <View style={styles.container} >
      <View style={styles.row}>
        <StatItem label='distance' {...(pretty.distance)} />
        <StatItem label='moving time' {...(pretty.moving_time)} />
      </View>
      <View style={styles.row}>
        <StatItem label='avg speed' {...(pretty.average_speed)} />
        <StatItem label='elevation gain' {...(pretty.total_elevation_gain)} />
        <StatItem label='max speed' {...(pretty.max_speed)} />
      </View>
    </View>
  )
}
