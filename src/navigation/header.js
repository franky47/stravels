import styles from './header.styles'

export default {
  main: {
    navigationOptions: {
      headerStyle: styles.main,
      headerTintColor: 'white'
    },
    statusBarStyle: 'light'
  },
  white: {
    navigationOptions: {
      headerStyle: styles.white
    },
    statusBarStyle: 'dark'
  }
}
