import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

// --

const icons = {
  'Run': 'directions-run',
  'Hike': 'directions-walk',
  'Ride': 'directions-bike'
}

export default class ActivityTypeIcon extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(icons)),
    style: Icon.propTypes.style
  }

  render () {
    return <Icon style={this.props.style} name={icons[this.props.type]} />
  }
}
