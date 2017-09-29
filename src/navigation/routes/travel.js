import { StackNavigator } from 'react-navigation'

import * as screens from '@stravels/screens'
import header from './header'

export default StackNavigator({
  SelectActivities: {
    screen: screens.SelectActivities,
    navigationOptions: {
      title: 'Select Activities'
    }
  },
  Travel: {
    screen: screens.Travel,
    navigationOptions: {
      title: 'Overview',
      ...header.main.navigationOptions
    }
  }
})
