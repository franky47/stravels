import React, { Component } from 'react'
import { FlatList, Button, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { selectors } from '../Redux'
import { activitiesRequest } from '../Redux/strava/actions'
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

class SelectActivitiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Select Activities',
      headerRight: (
        <Button
          title='Create'
          onPress={params.create}
        />
      )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      selected: new Set(),
      page: 1
    }
    // this.data = require('../Fixtures/activities.json')
  }

  componentDidMount () {
    this.props.navigation.setParams({ create: this._create.bind(this) })
    this.props.fetchInitialData()
  }
  _create () {
    const selected = Array.from(this.state.selected)
    console.tron.log(selected)
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
