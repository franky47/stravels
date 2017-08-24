import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import styles from './Styles/GoogleLoginButtonStyle'

export default class GoogleLoginButton extends Component {
  // Prop type warnings
  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('../Images/google-icon.png')}
          />
          <Text style={styles.text}>Continue with Google</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
