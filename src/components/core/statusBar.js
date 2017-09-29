import React from 'react'
import { Platform, StatusBar as ReactNativeStatusBar } from 'react-native'
import { Colors } from '@stravels/themes'

export default function StatusBar ({ main, shaded }) {
  const props = Platform.select({
    android: {
      translucent: true,
      backgroundColor: shaded ? 'rgba(0, 0, 0, 0.3)' : Colors.transparent
    },
    ios: {
      barStyle: main ? 'light-content' : 'dark-content'
    }
  })
  return <ReactNativeStatusBar {...props} animated />
}
