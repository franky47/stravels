import { StackNavigator } from 'react-navigation'
import AboutScreen from '../Screens/AboutScreen'
import MainScreen from '../Screens/MainScreen'
import LoginScreen from '../Screens/LoginScreen'
import SelectActivitiesScreen from '../Screens/SelectActivitiesScreen'
import ActivityScreen from '../Screens/ActivityScreen'
import MapView from '../Components/MapView'
import StatsScreen from '../Screens/StatsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AboutScreen: { screen: AboutScreen },
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  ActivityScreen: { screen: ActivityScreen },
  SelectActivitiesScreen: { screen: SelectActivitiesScreen },
  StatsScreen: { screen: StatsScreen },
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
