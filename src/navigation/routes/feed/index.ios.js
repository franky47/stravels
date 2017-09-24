import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Feed } from '@stravels/screens'
import TabBarIcon from '@stravels/components/core/tabBarIcon'

// Styles
import { Colors } from '@stravels/themes'

const icon = (name) => ({ tintColor }) => <TabBarIcon name={name} tintColor={tintColor} />

const config = {
  swipeEnabled: true,
  tabBarOptions: Platform.select({
    android: {
      style: {
        backgroundColor: Colors.main
      },
      indicatorStyle: {
        backgroundColor: 'white'
      }
    },
    ios: {

    }
  })
}

const routes = {
  Following: {
    screen: Feed.Following,
    path: 'feed/following',
    navigationOptions: {
      title: 'Following',
      tabBarIcon: icon('list')
    }
  },
  You: {
    screen: Feed.You,
    path: 'feed/you',
    navigationOptions: {
      title: 'You',
      tabBarIcon: icon('account-circle')
    }
  }
}

export default StackNavigator({
  _: {
    screen: TabNavigator(routes, config),
    navigationOptions: {
      title: 'Feed',
      headerLeft: icon('menu')({ tintColor: 'white' }),
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main
      }
    }
  }
})
