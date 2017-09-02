import { Text } from 'react-native'
import developmentConfig from './development'
import productionConfig from './production'

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = productionConfig.allowTextFontScaling

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !developmentConfig.yellowBox
}
