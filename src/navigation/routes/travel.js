import { StackNavigator } from 'react-navigation'

import * as screens from '@stravels/screens'
import header from './header'

export default StackNavigator({
  SelectActivities: {
    screen: screens.SelectActivitiesScreen,
    navigationOptions: {
      title: 'Select Activities'
    }
  },
  Travel: {
    screen: screens.TravelScreen,
    navigationOptions: {
      title: 'Overview',
      ...header.main.navigationOptions
    }
  }
})
