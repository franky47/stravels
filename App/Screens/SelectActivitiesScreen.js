import React, { Component } from 'react'
import { FlatList, Button, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { selectors } from '../Redux'
import { activitiesRequest } from '../Redux/strava/actions'
import { computeStats } from '../Engine/createTravel'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SelectActivitiesScreenStyle'

const RowItem = (props) => {
  return (
    <TouchableHighlight
      onPress={() => props.onPress(props.id)}
      style={[styles.item, props.selected ? styles.selectedItem : null]}
    >
      {props.children}
    </TouchableHighlight>
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

class SelectActivitiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const headerRight = params.create ? <CreateButton onPress={params.create} enabled={params.createButtonEnabled} /> : null
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
    console.tron.display({
      name: 'Stats',
      value: computeStats(activities)
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
  _renderItem ({ item }) {
    return (
      <RowItem
        id={item.id}
        onPress={this._onItemPress.bind(this)}
        selected={this.state.selected.has(item.id)}
      >
        <Text>{item.name}</Text>
      </RowItem>
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

  render () {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={this._renderSpinner.bind(this)}
        // onEndReached={this._onEndReached.bind(this)}
      />
    )
  }
}

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
