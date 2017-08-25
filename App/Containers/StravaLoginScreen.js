import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  View
} from 'react-native'
import StravaLoginButton from '../Components/StravaLoginButton'
import { connect } from 'react-redux'
import { startAuthorization } from '../Sagas/StravaSagas'

// Styles
import styles from './Styles/StravaLoginScreenStyle'

class StravaLoginScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={this.props.fetching} />
        <StravaLoginButton
          onPress={this.props.startAuthorization}
        />
        { this.props.loggedIn &&
          <View>
            <Image
              source={{ uri: this.props.photoURL }}
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
    fetching: state.strava.oauth.fetching,
    displayName: state.strava.user.firstname,
    photoUrl: state.strava.user.profile,
    loggedIn: !!state.strava.user.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startAuthorization: () => startAuthorization(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StravaLoginScreen)
