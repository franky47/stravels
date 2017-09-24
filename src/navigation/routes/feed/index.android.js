import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import routes from './routes'
import NavToolbar from '@stravels/components/nav/toolbar'
import NavToolbarIcon from '@stravels/components/nav/icon'
import MenuToolbar from '@stravels/components/nav/menuToolbar'
import { SelectActivitiesScreen } from '@stravels/screens'

// Styles
import { Colors } from '@stravels/themes'

class Toolbar extends React.PureComponent {
  render () {
    return (
      <NavToolbar>
        <NavToolbarIcon icon='notifications' color='white' onPress={this.newTravel} />
        <NavToolbarIcon icon='add' color='white' onPress={this.newTravel} />
        <NavToolbarIcon icon='more-vert' color='white' onPress={this.newTravel} />
      </NavToolbar>
    )
  }
  newTravel = () => {
    this.props.navigation.navigate('SelectActivities')
  }
}

const config = {
  swipeEnabled: true,
  tabBarOptions: {
    style: {
      backgroundColor: Colors.main
    },
    indicatorStyle: {
      backgroundColor: 'white'
    }
  }
}

export default StackNavigator({
  Feed: {
    screen: TabNavigator(routes, config),
    navigationOptions: ({ navigation }) => ({
      title: 'Feed',
      headerLeft: <MenuToolbar navigation={navigation} />,
      headerRight: <Toolbar navigation={navigation} />,
      headerTitleStyle: {
        color: 'white',
        fontWeight: '300'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main
      }
    })
  },
  SelectActivities: {
    screen: SelectActivitiesScreen
  }
})
