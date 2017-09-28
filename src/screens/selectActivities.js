// Structure
import React, { Component } from 'react'
import NavToolbar from '@stravels/components/nav/toolbar'
import NavToolbarIcon from '@stravels/components/nav/icon'
import ActivityList from '@stravels/components/containers/activityList'

// Behaviour
import { connect } from 'react-redux'
import selectors from '@stravels/redux/selectors'
import { actions as activities } from '@stravels/redux/strava/activities/actions'
import { filterActivities, groupByMonth } from '@stravels/transforms/activities'

// Styles
import { Colors } from '@stravels/themes'

// -----------------------------------------------------------------------------

const HeaderToolbar = (props) => {
  return (
    <NavToolbar>
      <NavToolbarIcon
        icon='check'
        color={Colors.main}
        onPress={props.create}
        disabled={!props.createButtonEnabled}
      />
    </NavToolbar>
  )
}

// -----------------------------------------------------------------------------

class SelectActivitiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const headerRight = params.create ? <HeaderToolbar {...params} /> : null
    return {
      title: 'Select Activities',
      headerRight
    }
  }

  state = {
    selected: new Set()
  }

  componentDidMount () {
    this.props.navigation.setParams({
      create: this.create,
      createButtonEnabled: false
    })
    if (this.props.sections.length === 0) {
      this.props.requestHead()
    }
  }

  onSelectedItemsChange = (selected) => {
    this.setState({ selected }, () => {
      const enabled = this.state.selected.size !== 0
      if (this.props.navigation.state.params.createButtonEnabled !== enabled) {
        this.props.navigation.setParams({
          createButtonEnabled: enabled
        })
      }
    })
  }

  create = () => {
    const activities = Array.from(this.state.selected)
    this.props.navigation.navigate('Travel', {
      activitiesIds: activities
    })
  }

  keyExtractor = (item) => item.id

  // --

  render () {
    return (
      <ActivityList
        sections={this.props.sections}
        keyExtractor={this.keyExtractor}
        onSelectedItemsChange={this.onSelectedItemsChange}
        onEndReached={this.props.requestTail}
        onRefresh={this.props.refresh}
        refreshing={this.props.fetching}
        selectedItems={this.state.selected}
      />
    )
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  const allActivities = selectors.strava.activities.getActivities(state)
  const filter = selectors.settings.getActivityFilter(state)
  const activities = filterActivities(allActivities, filter)
  const fetching = selectors.strava.activities.isFetching(state)
  return {
    sections: groupByMonth(activities),
    fetching,
    error: selectors.strava.activities.getError(state),
    showBottomSpinner: fetching && activities.length !== 0,
    enableOnEndReached: !selectors.strava.activities.isEof(state)
  }
}
const mergeProps = (stateProps, { dispatch }, ownProps) => {
  return {
    ...stateProps,
    ...ownProps,
    requestHead: () => dispatch(activities.requestHead()),
    refresh: () => {
      dispatch(activities.clear())
      dispatch(activities.requestHead())
    },
    requestTail: () => {
      if (stateProps.enableOnEndReached && stateProps.sections.length && !stateProps.fetching) {
        dispatch(activities.requestTail())
      }
    }
  }
}

export default connect(mapStateToProps, null, mergeProps)(SelectActivitiesScreen)
