import { Platform } from 'react-native'

// https://github.com/alekhurst/react-native-elevated-view
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

export default {
  elevation
}
