import { DrawerNavigator } from 'react-navigation'

// Routes & Screens
import Feed from './feed'
import * as screens from '@stravels/screens'

const drawerOptions = {
  initialRouteName: 'Feed'
}

const drawerItems = {
  Feed: {
    screen: Feed,
    path: 'feed',
    navigationOptions: {
      title: 'Feed'
    }
  },
  Settings: {
    screen: screens.SettingsPreferences,
    path: 'settings',
    navigationOptions: {
      title: 'Settings'
    }
  },
  About: {
    screen: screens.About,
    path: 'about',
    navigationOptions: {
      title: 'About'
    }
  }
}

export default DrawerNavigator(drawerItems, drawerOptions)
