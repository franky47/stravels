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
      this.setState({
        user: this.strava.userProfile,
        loggedIn: true
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
          <Text>Welcome, {this.state.user.firstname} !</Text>
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
