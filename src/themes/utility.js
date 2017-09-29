import { Platform, Dimensions, StatusBar } from 'react-native'

// From https://github.com/alekhurst/react-native-elevated-view
const elevation = (value) => {
  return Platform.select({
    android: {
      elevation: value
    },
    ios: {
      shadowOpacity: 0.0015 * value + 0.18,
      shadowRadius: 0.54 * value,
      shadowOffset: {
        height: 0.6 * value
      }
    }
  })
}

// From https://github.com/ptelad/react-native-iphone-x-helper
const iPhoneX = () => {
  const { height, width } = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  )
}

const statusBarHeight = Platform.select({
  ios: iPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight
})

export default {
  elevation,
  statusBarHeight
}
