import React from 'react'
import { Feed } from '@stravels/screens'
import TabBarIcon from '@stravels/components/core/tabBarIcon'

const icon = (name) => ({ tintColor }) => <TabBarIcon name={name} tintColor={tintColor} />

export default {
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
