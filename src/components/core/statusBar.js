import React from 'react'
import { Platform, StatusBar as ReactNativeStatusBar } from 'react-native'
import { Colors } from '@stravels/themes'

export default function StatusBar ({ main }) {
  const props = Platform.select({
    android: {
      backgroundColor: main ? Colors.main : 'black'
    },
    ios: {
      barStyle: main ? 'light-content' : 'dark-content'
    }
  })
  return <ReactNativeStatusBar {...props} />
}
