import React, { Component } from 'react'
import { View, FlatList, Button, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { selectors } from '../redux'
import { activitiesRequest } from '../redux/strava/actions'
import {
  computeStats,
  computeCarbonScore
} from '../engine/createTravel'
import { prettifyStats, prettifyMass } from '../transforms/prettify'
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
        icon='add'
        onPress={props.create}
        disabled={!props.createButtonEnabled}
      />
    </NavToolbar>
  )
}

const CreateButton = (props) => {
  return (
    <Button
      title='Create'
      onPress={props.onPress}
      disabled={!props.enabled}
    />
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
    if (this.props.data.length === 0) {
      this.props.fetchInitialData()
    }
  }
  _create () {
    const selected = Array.from(this.state.selected)
    const activities = this.props.data.filter((activity) => selected.indexOf(activity.id) > -1)
    const stats = computeStats(activities)
    console.tron.display({
      name: 'Stats',
      value: {
        ...prettifyStats(stats),
        carbonScore: prettifyMass(computeCarbonScore(stats) * 0.001)
      }
    })
    this.setState({
      selected: new Set()
    }, () => {
      this.props.navigation.setParams({
        createButtonEnabled: false
      })
    })
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
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={this._renderSpinner.bind(this)}
        ItemSeparatorComponent={this._renderSeparator}
        // onEndReached={this._onEndReached.bind(this)}
      />
    )
  }
  _renderItem ({ item }) {
    const selected = this.state.selected.has(item.id)
    const imageUrl = getPolylineUrl(item.map.summary_polyline, {
      mapId: 'mapbox.outdoors'
    })
    return (
      <TouchableWithoutFeedback
        underlayColor='#ccc'
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
      </TouchableWithoutFeedback>
    )
  }
  _renderSeparator () {
    return <View style={{
      height: 1,
      backgroundColor: '#ddd'
    }} />
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
  const data = Object.keys(activities).map((id) => activities[id]).reverse()
  return {
    data,
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
