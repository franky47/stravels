import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import Secrets from 'react-native-config'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import StravaApi from '../Services/Strava'
import Firebase, { loginWithStrava } from '../Services/Firebase'

// Styles
import styles from './Styles/StravaLoginScreenStyle'

class StravaLoginScreen extends Component {

  constructor(props) {
    super(props)
    this.strava = new StravaApi()
    this.state = {
      debug: '',
      user: {},
      loggedIn: false
    }
  }

  componentDidMount() {
    Linking.getInitialURL().then((event) => {
      if (event) {
        this._handleUrl(event)
      }
    }).catch(err => {
        console.warn('An error occurred', err)
    })
    Linking.addEventListener('url', this._handleUrl.bind(this))
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl.bind(this))
  }
  _handleUrl(event) {
    this.strava.handleOauthRedirectUrl(event.url, () => {
      loginWithStrava(this.strava.userProfile)
        .then((firebaseUser) => {
          this.setState({
            loggedIn: true,
            user: firebaseUser
          })
        })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='#FC601D'
          style={styles.button}
          onPress={() => Linking.openURL(this.strava.oauthUri)}
        >
          <Text style={styles.buttonText}>Login with Strava</Text>
        </TouchableHighlight>
        { this.state.loggedIn &&
          <View>
            <Image source={{ uri: this.state.user.photoURL}} style={{width: 100, height: 100}}/>
            <Text>Welcome, {this.state.user.displayName} !</Text>
          </View>
        }

      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(StravaLoginScreen)
