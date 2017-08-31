import { StackNavigator } from 'react-navigation'
import AboutScreen from '../Screens/AboutScreen'
import MainScreen from '../Screens/MainScreen'
import LoginScreen from '../Screens/LoginScreen'
import SelectActivitiesScreen from '../Screens/SelectActivitiesScreen'
import ActivityScreen from '../Screens/ActivityScreen'
import LaunchScreen from '../Screens/LaunchScreen'
import MapView from '../Components/MapView'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AboutScreen: { screen: AboutScreen },
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen },
  SelectActivitiesScreen: { screen: SelectActivitiesScreen },
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
