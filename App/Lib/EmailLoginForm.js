import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import styles from './Styles/EmailLoginFormStyle'

export default class EmailLoginForm extends Component {
  // Prop type warnings
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  // Defaults for props
  static defaultProps = {
    onSubmit: () => {}
  }

  render () {
    const placeholderTextColor = 'rgba(255, 255, 255, 0.8)'
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='email'
          placeholderTextColor={placeholderTextColor}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder='password'
          placeholderTextColor={placeholderTextColor}
          secureTextEntry
          returnKeyType='go'
          ref={(input) => { this.passwordInput = input }}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.onSubmit}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.emailLinks}>
          <Text style={styles.linkText}>Create account</Text>
          <Text style={styles.linkText}>Forgot Password ?</Text>
        </View>
      </View>
    )
  }
}
