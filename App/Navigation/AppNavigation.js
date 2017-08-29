import { StackNavigator } from 'react-navigation'
import MainScreen from '../Screens/MainScreen'
import LoginScreen from '../Screens/LoginScreen'
import ActivityScreen from '../Screens/ActivityScreen'
import LaunchScreen from '../Screens/LaunchScreen'
import MapView from '../Components/MapView'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen },
  MapView: { screen: MapView }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
