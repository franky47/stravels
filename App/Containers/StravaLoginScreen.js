import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  View
} from 'react-native'
import StravaLoginButton from '../Components/StravaLoginButton'
import { connect } from 'react-redux'
import { oauthAuthorizeRequest } from '../Redux/strava/actions'
import { selectors } from '../Redux'

// Styles
import styles from './Styles/StravaLoginScreenStyle'

class StravaLoginScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={this.props.fetching} />
        <StravaLoginButton
          onPress={this.props.requestAuth}
        />
        { this.props.loggedIn &&
          <View>
            <Image
              source={{ uri: this.props.photoUrl }}
              style={{ width: 100, height: 100 }} />
            <Text>Welcome, {this.props.displayName} !</Text>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: selectors.strava.isOAuthFetching(state),
    displayName: selectors.strava.getUserName(state),
    photoUrl: selectors.strava.getUserProfilePicture(state),
    loggedIn: selectors.strava.isLoggedIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestAuth: () => dispatch(oauthAuthorizeRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StravaLoginScreen)
