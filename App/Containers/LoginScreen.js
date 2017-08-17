import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import FacebookLoginButton from '../Components/FacebookLoginButton'
import GoogleLoginButton from '../Components/GoogleLoginButton'
import EmailLoginForm from '../Components/EmailLoginForm'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          {this._renderSocialLogin()}
          {this._renderDivider()}
          <EmailLoginForm />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
  _renderSocialLogin () {
    return (
      <View style={styles.socialLoginsContainer}>
        <GoogleLoginButton
          onPress={() => {}}
        />
        <FacebookLoginButton
          onPress={() => {}}
        />
      </View>
    )
  }
  _renderDivider () {
    return <View style={{
      height: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 10,
      marginBottom: 12
    }}></View>
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
