import React from 'react'
import ReactNative from 'react-native'
import { Colors } from '@stravels/themes'

export default function StatusBar ({ main }) {
  const props = ReactNative.Platform.select({
    android: {
      backgroundColor: main ? Colors.main : 'black'
    },
    ios: {
      barStyle: main ? 'light-content' : 'dark-content'
    }
  })
  return <ReactNative.StatusBar {...props} />
}
