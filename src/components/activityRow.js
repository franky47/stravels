import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapThumbnail from './mapThumbnail'
import { prettifyDistance, prettifyElevation } from '@stravels/transforms/prettify'

import styles from './activityRow.styles'

const icons = {
  'Run': 'directions-run',
  'Hike': 'directions-walk',
  'Ride': 'directions-bike'
}

export default class ActivityRow extends PureComponent {
  render () {
    return (
      <View style={styles.mainContainer}>
        { this.renderImage() }
        <View style={styles.textContainer}>
          { this.renderTitle() }
          { this.renderDescription() }
        </View>
      </View>
    )
  }

  // --

  renderImage () {
    return <MapThumbnail
      style={styles.image}
      polyline={this.props.polyline}
      options={{ mapId: 'mapbox.outdoors' }}
    />
  }
  renderTitle () {
    const lock = this.props.private ? <Icon name='lock' /> : null
    const work = this.props.commute ? <Icon name='work' /> : null
    return <Text style={styles.title}>
      {this.props.title}
      {work !== null ? ' ' : ''}{work}
      {lock !== null ? ' ' : ''}{lock}
    </Text>
  }
  renderDescription () {
    const prettifyToString = (obj) => `${obj.value}${obj.unit}`
    const distance = prettifyToString(prettifyDistance(this.props.distance))
    const elevation = prettifyToString(prettifyElevation(this.props.elevation))

    return (
      <View style={styles.descriptionContainer}>
        { icons.hasOwnProperty(this.props.type) &&
          <Icon style={styles.descriptionIcon} name={icons[this.props.type]} />
        }
        <Text style={styles.descriptionText}>{distance}</Text>
        <Icon style={styles.descriptionIcon} name='trending-up' />
        <Text style={styles.descriptionText}>{elevation}</Text>
      </View>
    )
  }
}
