import { StackNavigator } from 'react-navigation'
import MainScreen from '../Containers/MainScreen'
import StravaLoginScreen from '../Containers/StravaLoginScreen'
import ActivityScreen from '../Containers/ActivityScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import MapView from '../Components/MapView'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainScreen: { screen: MainScreen },
  StravaLoginScreen: { screen: StravaLoginScreen },
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen },
  MapView: { screen: MapView }
}, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'StravaLoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
