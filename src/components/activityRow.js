// Structure
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapThumbnail from './mapThumbnail'
import ActivityTypeIcon from '@stravels/components/strava/activityTypeIcon'

// Styles
import styles from './activityRow.styles'
import { prettifyDistance, prettifyElevation } from '@stravels/transforms/prettify'

export default class ActivityRow extends PureComponent {
  render () {
    return (
      <View style={styles.mainContainer}>
        <MapThumbnail
          style={styles.image}
          polyline={this.props.polyline}
          options={{
            mapId: 'mapbox.light',
            strokeColor: '2c2'
          }}
        />
        <View style={styles.textContainer}>
          { this.renderTitle() }
          { this.renderDescription() }
        </View>
      </View>
    )
  }

  // --

  renderTitle = () => {
    const lock = this.props.private ? <Icon name='lock' /> : null
    const work = this.props.commute ? <Icon name='work' /> : null
    return (
      <Text style={styles.title}>
        {this.props.title}
        {work !== null ? ' ' : ''}{work}
        {lock !== null ? ' ' : ''}{lock}
      </Text>
    )
  }
  renderDescription = () => {
    const prettifyToString = (obj) => `${obj.value}${obj.unit}`
    const distance = prettifyToString(prettifyDistance(this.props.distance))
    const elevation = prettifyToString(prettifyElevation(this.props.elevation))

    return (
      <View style={styles.descriptionContainer}>
        <ActivityTypeIcon style={styles.descriptionIcon} type={this.props.type} />
        <Text style={styles.descriptionText}>{distance}</Text>
        <Icon style={styles.descriptionIcon} name='trending-up' />
        <Text style={styles.descriptionText}>{elevation}</Text>
      </View>
    )
  }
}
