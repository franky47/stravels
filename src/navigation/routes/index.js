import MainNavigator from './main'
import { LoginScreen } from '@stravels/screens'

export default {
  Login: {
    screen: LoginScreen,
    path: 'login',
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      header: null
    }
  }
}
