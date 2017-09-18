import codePush from 'react-native-code-push'
import { Platform } from 'react-native'

const config = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,

  // Interactive install mode
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true
}

export default (App) => codePush(config)(App)

// Security note: deployment keys are only pointers to the latest binary:
// https://github.com/Microsoft/react-native-code-push/issues/437
const deploymentKeys = {
  android: {
    staging: '7c11cetf9pg7Vw8MGIoYQ7gID_x2f8b0f9ad-f5de-433d-8f47-ae86b04fab79',
    production: 'jzpge4qqSK9q9VJYl8MkWl21lLlff8b0f9ad-f5de-433d-8f47-ae86b04fab79'
  },
  ios: {
    staging: '_606wAYbjRSGPtcEwo9YI2GJXCd8f8b0f9ad-f5de-433d-8f47-ae86b04fab79',
    production: 'Pr5c6Ktf8Ur7iRcG12rM23IOSzPHf8b0f9ad-f5de-433d-8f47-ae86b04fab79'
  }
}

export const getDeploymentKey = (production = true) => {
  const keys = Platform.select(deploymentKeys)
  return production ? keys.production : keys.staging
}
