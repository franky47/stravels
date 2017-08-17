import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import ActivityScreen from '../Containers/ActivityScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
