import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ToggleSwitch from '@stravels/components/settings/toggle'
import { actions as settings } from '@stravels/redux/settings/actions'
import selectors from '@stravels/redux/selectors'

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
        <ToggleSwitch label='Show Commutes'
          icon='work'
          value={this.props.showCommutes}
          onChange={this.props.onShowCommutesChange}
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
    showPrivate: selectors.settings.showPrivate(state),
    showCommutes: selectors.settings.showCommutes(state),
    showRides: selectors.settings.showRides(state),
    showHikes: selectors.settings.showHikes(state),
    showRuns: selectors.settings.showRuns(state)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onShowPrivateChange: (value) => dispatch(settings.showPrivate(!!value)),
    onShowCommutesChange: (value) => dispatch(settings.showCommutes(!!value)),
    onShowRidesChange: (value) => dispatch(settings.showRides(!!value)),
    onShowHikesChange: (value) => dispatch(settings.showHikes(!!value)),
    onShowRunsChange: (value) => dispatch(settings.showRuns(!!value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen)
