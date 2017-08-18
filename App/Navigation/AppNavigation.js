import { StackNavigator } from 'react-navigation'
import StravaLoginScreen from '../Containers/StravaLoginScreen'
import LoginScreen from '../Containers/LoginScreen'
import ActivityScreen from '../Containers/ActivityScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  StravaLoginScreen: { screen: StravaLoginScreen },
  LoginScreen: { screen: LoginScreen },
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'StravaLoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
