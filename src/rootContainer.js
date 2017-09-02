import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from './navigation/reduxNavigation'
import { connect } from 'react-redux'
import startupActions from './redux/startupRedux'
import reduxPersist from './config/reduxPersist'

// Styles
import styles from './rootContainer.styles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!reduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationRootView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(startupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
