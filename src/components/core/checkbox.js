import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@stravels/themes'

export default class Checkbox extends PureComponent {
  render () {
    return <Icon
      onPress={this.props.onPress}
      style={this.props.style}
      name={this.props.checked ? 'check-box' : 'check-box-outline-blank'}
      color={this.props.checked ? Colors.checkboxOn : Colors.checkboxOff}
      size={this.props.size || 24}
    />
  }
}
