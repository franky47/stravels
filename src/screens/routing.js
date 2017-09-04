import React, { Component } from 'react'
import { View, FlatList, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import routes from '@stravels/navigation/routes'
import { NavigationActions } from 'react-navigation'
import { logoutRequest } from '@stravels/redux/strava/actions'
import confirmLogout from '@stravels/components/modals/logout'

import styles from './routing.styles'

class RoutingScreen extends Component {
  render () {
    const data = Object.keys(routes)
    return (
      <View style={styles.mainContainer} >
        <FlatList
          data={data}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item) => item}
        />
        <Text onPress={() => confirmLogout(this.props.logout)}>Log out</Text>
      </View>
    )
  }
  _renderItem ({ item }) {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='transparent'
        onPress={() => this.props.navigate(item)}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableHighlight>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(NavigationActions.navigate({
    routeName: route
  })),
  logout: () => dispatch(logoutRequest())
})

export default connect(null, mapDispatchToProps)(RoutingScreen)
