import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ProgressiveImage from './core/progressiveImage'
import { Images } from '@stravels/themes'
import { prettifyDistance, prettifyElevation } from '@stravels/transforms/prettify'

import styles from './activityRow.styles'

const icons = {
  'Run': 'directions-run',
  'Hike': 'directions-walk',
  'Ride': 'directions-bike'
}

export default class ActivityRow extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        { this._renderImage() }
        <View style={styles.textContainer}>
          { this._renderTitle() }
          { this._renderDescription() }
        </View>
      </View>
    )
  }

  // --

  _renderImage () {
    return <ProgressiveImage
      style={styles.image}
      source={{ uri: this.props.imageUrl }}
      placeholder={Images.placeholder}
    />
  }
  _renderTitle () {
    const lock = this.props.private ? <Icon name='lock' /> : null
    return <Text style={styles.title}>{this.props.title} {lock}</Text>
  }
  _renderDescription () {
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
