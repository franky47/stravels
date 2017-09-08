// Structure
import React, { Component } from 'react'
import { View } from 'react-native'

// Beahviour
import { connect } from 'react-redux'
import ReduxNavigation from './navigation/reduxNavigation'
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
        <ReduxNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(startupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
