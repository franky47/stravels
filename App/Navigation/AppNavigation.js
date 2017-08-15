import { StackNavigator } from 'react-navigation'
import ActivityScreen from '../Containers/ActivityScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ActivityScreen: { screen: ActivityScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ActivityScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
