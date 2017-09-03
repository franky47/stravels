import { StackNavigator } from 'react-navigation'
import styles from './appNavigation.styles'

import routes from './routes'

const config = {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: styles.headerWhite
  },
  cardStyle: styles.navigationScreen
}

export default StackNavigator(routes, config)
