import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native'
import styles from './Styles/ActivityRowStyle'
import Checkbox from './Checkbox'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../Themes'

export default class ActivityRow extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([null, 'Run', 'Ride', 'Hike']).isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    imageUri: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    selectable: PropTypes.bool,

    // Upwards action callbacks
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    checked: false,
    selectable: false,
    type: null,
    onPress: () => {},
    onLongPress: () => {}
  }

  render () {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        underlayColor='transparent'
      >
        <View style={styles.container}>
          { this._renderIcon() }
          <View style={styles.textContainer}>
            { this._renderTitle() }
            { this._renderDescription() }
          </View>
          { this._renderCheckbox() }
        </View>
      </TouchableHighlight>
    )
  }

  // Private

  _renderIcon () {
    return <Image
      style={styles.icon}
      source={{ uri: this.props.imageUri }}
    />
  }
  _renderTitle () {
    return <Text style={styles.title}>{this.props.title}</Text>
  }
  _renderDescription () {
    const getTypeIcon = () => {
      switch (this.props.type) {
        case 'Run':
        case 'Hike':
          return 'ios-walk'
        case 'Ride':
          return 'ios-bicycle'
      }
    }
    const prettyDistance = (meters) => {
      if (meters < 1000.0) {
        return `${meters.toFixed(2)} m`
      } else {
        return `${(meters * 0.001).toFixed(2)} km`
      }
    }
    const distance = prettyDistance(this.props.distance)
    const elevation = `${this.props.elevation} m`

    return (
      <View style={styles.descriptionContainer}>
        { this.props.type &&
          <Icon style={styles.descriptionIcon} name={getTypeIcon()} />
        }
        <Text style={styles.descriptionText}>{distance}</Text>
        <Icon style={styles.descriptionIcon} name='ios-trending-up' />
        <Text style={styles.descriptionText}>{elevation}</Text>
      </View>
    )
  }
  _renderCheckbox () {
    if (!this.props.selectable) {
      return null
    }
    const colorMapper = (checked) => {
      return checked ? Colors.checkboxOn : Colors.checkboxOff
    }
    return <Checkbox
      checked={this.props.checked}
      onPress={this.props.onPress}
      color={colorMapper}
    />
  }
}
