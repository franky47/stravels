import codePush from 'react-native-code-push'

const config = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,

  // Interactive install mode
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true
}

export default (App) => codePush(config)(App)
