import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ToggleSwitch from '@stravels/components/settings/toggle'
import * as actions from '@stravels/redux/settings/actions'
import { selectors } from '@stravels/redux'

import styles from './preferences.styles'

class PreferencesScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ToggleSwitch label='Show Private Activities'
          icon='lock'
          value={this.props.showPrivate}
          onChange={this.props.onShowPrivateChange}
        />
        <ToggleSwitch label='Show Rides'
          icon='directions-bike'
          value={this.props.showRides}
          onChange={this.props.onShowRidesChange}
        />
        <ToggleSwitch label='Show Hikes'
          icon='directions-walk'
          value={this.props.showHikes}
          onChange={this.props.onShowHikesChange}
        />
        <ToggleSwitch label='Show Runs'
          icon='directions-run'
          value={this.props.showRuns}
          onChange={this.props.onShowRunsChange}
        />
      </View>
    )
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  return {
    // Activity Filter
    showPrivate: selectors.settings.showPrivateActivities(state),
    showRides: selectors.settings.showRides(state),
    showHikes: selectors.settings.showHikes(state),
    showRuns: selectors.settings.showRuns(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onShowPrivateChange: (value) => dispatch(actions.showPrivateActivities(!!value)),
    onShowRidesChange: (value) => dispatch(actions.showRides(!!value)),
    onShowHikesChange: (value) => dispatch(actions.showHikes(!!value)),
    onShowRunsChange: (value) => dispatch(actions.showRuns(!!value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen)
