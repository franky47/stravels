import React from 'react'
import { Platform, StatusBar as ReactNativeStatusBar } from 'react-native'
import { Colors } from '@stravels/themes'

export default function StatusBar ({ main, shaded }) {
  const props = Platform.select({
    android: {
      backgroundColor: main ? (shaded ? Colors.mainShaded : Colors.main) : 'black'
    },
    ios: {
      barStyle: main ? 'light-content' : 'dark-content'
    }
  })
  return <ReactNativeStatusBar {...props} />
}
