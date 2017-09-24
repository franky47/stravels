import { TabNavigator } from 'react-navigation'

import * as screens from '@stravels/screens'
import header from './header'

export default TabNavigator({
  // Debug Screens
  About: {
    screen: screens.AboutScreen,
    path: 'about',
    navigationOptions: {
      title: 'About',
      ...header.main.navigationOptions
    }
  },
  Sandbox: {
    screen: screens.SandboxScreen,
    navigationOptions: {
      title: 'Sandbox'
    }
  },
  Routing: {
    screen: screens.RoutingScreen,
    navigationOptions: {
      title: 'Routing'
    }
  }
})
