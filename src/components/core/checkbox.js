import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@stravels/themes'

export default class Checkbox extends PureComponent {
  // shouldComponentUpdate (nextProps, nextState) {
  //   if (this.props.checked !== nextProps.checked) return true
  //   if (this.props.size !== nextProps.size) return true
  //   return false
  // }

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
