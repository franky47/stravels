import * as screens from '../screens'
import header from './header'

export default {
  Login: {
    screen: screens.LoginScreen,
    path: 'login',
    header: null
  },
  About: {
    screen: screens.AboutScreen,
    path: 'about',
    title: 'About',
    ...header.main
  },
  SelectActivities: {
    screen: screens.SelectActivitiesScreen,
    title: 'Select Activities'
  },
  Sandbox: {
    screen: screens.SandboxScreen
  }
}
