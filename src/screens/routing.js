import React, { PureComponent } from 'react'
import { View, FlatList, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import routes from '@stravels/navigation/routes'
import { NavigationActions } from 'react-navigation'
import { actions as oauth } from '@stravels/redux/strava/oauth/actions'
import { confirmLogout } from '@stravels/utility/alerts'

import styles from './routing.styles'

class RouteItem extends PureComponent {
  render () {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='transparent'
        onPress={this.onPress}
      >
        <Text style={styles.text}>{this.props.route}</Text>
      </TouchableHighlight>
    )
  }
  onPress = () => {
    this.props.navigate(this.props.route)
  }
}

// --

class RoutingScreen extends PureComponent {
  render () {
    const data = Object.keys(routes)
    return (
      <View style={styles.mainContainer} >
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item}
        />
        <View style={styles.footer}>
          <Text onPress={this.confirmLogout}>
            Log out
          </Text>
        </View>
      </View>
    )
  }
  renderItem = ({ item }) => (
    <RouteItem
      route={item}
      navigate={this.props.navigate}
    />
  )
  confirmLogout = () => {
    confirmLogout(this.props.requestLogout)
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  requestLogout: () => dispatch(oauth.logoutRequest())
})

export default connect(null, mapDispatchToProps)(RoutingScreen)
