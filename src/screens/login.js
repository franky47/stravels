import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { oauthAuthorizeRequest } from '@stravels/redux/strava/actions'
import { selectors } from '@stravels/redux'
import { Images } from '@stravels/themes'

// Styles
import styles from './login.styles'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.logoContainer}>
          <Image
            source={Images.loginLogo}
            style={styles.logo}
          />
        </View>
        <View style={styles.uiContainer}>
          { this._renderButton() }
          { this._renderError() }
          <View style={styles.footer}>
            <Image source={Images.strava.poweredBy.white} />
          </View>
        </View>
      </View>
    )
  }
  _renderButton () {
    const showButton = !this.props.fetching // todo: better logic
    if (showButton) {
      return (
        <TouchableHighlight
          onPress={this.props.requestAuth}
          style={styles.buttonContainer}
          underlayColor='transparent'
        >
          <Image source={Images.strava.connect.light} />
        </TouchableHighlight>
      )
    } else {
      return <ActivityIndicator
        animating
        color='white'
        size='large'
        style={styles.spinner}
      />
    }
  }
  _renderError () {
    const error = this.props.error
    if (!error) return null
    const text = error.message || error.toString() || JSON.stringify(error)
    return <Text style={styles.error}>Error: {text}</Text>
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: selectors.strava.isOAuthFetching(state),
    displayName: selectors.strava.getUserName(state),
    photoUrl: selectors.strava.getUserProfilePicture(state),
    loggedIn: selectors.strava.isLoggedIn(state),
    error: selectors.strava.getOAuthError(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestAuth: () => dispatch(oauthAuthorizeRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
