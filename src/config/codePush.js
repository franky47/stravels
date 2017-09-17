import codePush from 'react-native-code-push'

const config = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  updateDialog: true
}

export default (App) => codePush(config)(App)
