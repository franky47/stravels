import React, { Component } from 'react'
import { View, Text, SectionList, TouchableHighlight, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { selectors } from '../redux'
import { activitiesRequest } from '../redux/strava/actions'
// import { computeStats, computeCarbonScore } from '../engine/createTravel'
// import { prettifyStats, prettifyMass } from '../transforms/prettify'
import { stateToMonthlySections } from '../transforms/activities'
import { getPolylineUrl } from '../services/mapboxStatic'

import { Colors } from '../themes'
import NavToolbar from '../components/nav/toolbar'
import NavToolbarIcon from '../components/nav/icon'
import ActivityRow from '../components/activityRow'

// Styles
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
  constructor (props) {
    super(props)
    this.state = {
      selected: new Set(),
      page: 1
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({
      create: this._create.bind(this),
      createButtonEnabled: false
    })
    if (this.props.sections.length === 0) {
      this.props.fetchInitialData()
    }
  }
  _create () {
    // const selected = Array.from(this.state.selected)
    // const activities = this.props.sections.filter((activity) => selected.indexOf(activity.id) > -1)
    // const stats = computeStats(activities)
    // console.tron.display({
    //   name: 'Stats',
    //   value: {
    //     ...prettifyStats(stats),
    //     carbonScore: prettifyMass(computeCarbonScore(stats) * 0.001)
    //   }
    // })
    // this.setState({
    //   selected: new Set()
    // }, () => {
    //   this.props.navigation.setParams({
    //     createButtonEnabled: false
    //   })
    // })
  }

  _onItemPress (id) {
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Set(state.selected)
      if (selected.has(id)) {
        selected.delete(id)
      } else {
        selected.add(id)
      }
      return { selected }
    }, () => {
      const enabled = this.state.selected.size !== 0
      if (this.props.navigation.state.params.createButtonEnabled !== enabled) {
        this.props.navigation.setParams({
          createButtonEnabled: enabled
        })
      }
    })
  }

  render () {
    return (
      <SectionList
        sections={this.props.sections}
        renderItem={this._renderItem.bind(this)}
        renderSectionHeader={({section}) => <SectionHeader title={section.title} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={this._renderSpinner.bind(this)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // stickySectionHeadersEnabled
        refreshing={this.props.fetching}
      />
    )
  }
  _renderItem ({ item }) {
    const selected = this.state.selected.has(item.id)
    const imageUrl = getPolylineUrl(item.map.summary_polyline, {
      mapId: 'mapbox.outdoors'
    })
    return (
      <TouchableHighlight
        underlayColor={Colors.highlightUnderlay}
        onPress={this._onItemPress.bind(this, item.id)}
      >
        <View style={styles.row}>
          <ActivityRow
            title={item.name}
            elevation={item.total_elevation_gain}
            imageUrl={imageUrl}
            {...item}
          />
          <Icon
            style={styles.checkbox}
            name={selected ? 'check-box' : 'check-box-outline-blank'}
            color={selected ? Colors.main : Colors.secondary}
            size={24}
          />
        </View>
      </TouchableHighlight>
    )
  }
  _renderSpinner () {
    if (!this.props.fetching) return null
    return <ActivityIndicator animating size='large' style={styles.spinner} />
  }
  _onEndReached () {
    // this.setState((state) => {
    //   const newPage = state.page + 1
    //   this.props.fetchData(newPage)
    //   return { ...state, page: newPage }
    // })
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  const activities = selectors.strava.getActivities(state)
  return {
    sections: stateToMonthlySections(activities),
    fetching: selectors.strava.isActivitiesFetching(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialData: () => dispatch(activitiesRequest(1)),
    fetchData: (page) => dispatch(activitiesRequest(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectActivitiesScreen)
