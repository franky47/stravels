import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'
import styles from './Styles/CheckboxStyle'

export default class Checkbox extends Component {
  // Prop type warnings
  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    checked: PropTypes.bool,
    color: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    checked: false,
    color: () => 'black',
    onLongPress: () => {}
  }

  render () {
    const checked = this.props.checked
    const imgSource = checked ? require('../Images/checkbox-on.png')
                              : require('../Images/checkbox-off.png')

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        underlayColor='transparent'
      >
        <View style={styles.container}>
          <Image source={imgSource} style={{tintColor: this.props.color(checked)}} />
        </View>
      </TouchableHighlight>
    )
  }
}
