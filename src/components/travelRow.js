import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { prettifyDateRange } from '@stravels/transforms/prettify'

import styles from './travelRow.styles'

export default class TravelRow extends PureComponent {
  render () {
    const { start_date, end_date, title } = this.props
    const dateRange = prettifyDateRange(start_date, end_date)
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {dateRange}
          </Text>
        </View>
      </View>
    )
  }
}
