import { TabNavigator } from 'react-navigation'

import * as screens from '@stravels/screens'
import header from './header'

export default TabNavigator({
  // Debug Screens
  About: {
    screen: screens.About,
    path: 'about',
    navigationOptions: {
      title: 'About',
      ...header.main.navigationOptions
    }
  },
  Sandbox: {
    screen: screens.Sandbox,
    navigationOptions: {
      title: 'Sandbox'
    }
  }
})
