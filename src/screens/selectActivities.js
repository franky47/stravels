// Structure
import React, { Component } from 'react'
import { View, Text, SectionList, ActivityIndicator } from 'react-native'
import NavToolbar from '@stravels/components/nav/toolbar'
import NavToolbarIcon from '@stravels/components/nav/icon'
import ActivityRow from '@stravels/components/activityRow'
import MultiSelectList from '@stravels/components/containers/multiSelectList'

// Behaviour
import { connect } from 'react-redux'
import selectors from '@stravels/redux/selectors'
import { actions as activities } from '@stravels/redux/strava/activities/actions'
import { filterActivities, groupByMonth } from '@stravels/transforms/activities'

// Styles
import { Colors } from '@stravels/themes'
import styles from './selectActivities.styles'

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

const SectionHeader = (props) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{props.title}</Text>
    </View>
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
      create: this._create,
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

  _create = () => {
    const activities = Array.from(this.state.selected)
    this.props.navigation.navigate('Travel', {
      activitiesIds: activities
    })
  }

  render () {
    return (
      <MultiSelectList
        ListType={SectionList}
        sections={this.props.sections}
        renderItem={this._renderItem}
        renderSectionHeader={({section}) => <SectionHeader title={section.title} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this._renderError}
        ListFooterComponent={this._renderSpinner}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={this.props.fetching}
        onEndReached={this.props.requestTail}
        onRefresh={this.props.refresh}
        rowStyle={styles.row}
        checkboxStyle={styles.checkbox}
        selectedItems={this.state.selected}
        onSelectedItemsChange={this.onSelectedItemsChange}
      />
    )
  }
  _renderItem = ({ item }) => {
    return (
      <ActivityRow
        title={item.name}
        elevation={item.total_elevation_gain}
        polyline={item.map.summary_polyline}
        {...item}
      />
    )
  }
  _renderError = () => {
    if (!this.props.error) return null
    return <Text>{JSON.stringify(this.props.error, null, 2)}</Text>
  }
  _renderSpinner = () => {
    if (!this.props.showBottomSpinner) return null
    return <ActivityIndicator animating size='large' style={styles.spinner} />
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
