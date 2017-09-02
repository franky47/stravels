import { StackNavigator } from 'react-navigation'
import * as screens from '../screens'
import styles from './appNavigation.styles'

const routes = {
  About: {
    screen: screens.AboutScreen,
    path: 'about',
    title: 'About'
  },
  Login: {
    screen: screens.LoginScreen,
    path: 'login'
  },
  SelectActivities: {
    screen: screens.SelectActivitiesScreen,
    title: 'Select Activities'
  }
}
const config = {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: styles.header
  }
}

export default StackNavigator(routes, config)
