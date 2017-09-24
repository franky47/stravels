import React from 'react'
import { View, Platform } from 'react-native'
import StatusBar from '@stravels/components/core/statusBar'

function FeedTab ({ children }) {
  const android = Platform.OS === 'android'
  return (
    <View>
      <StatusBar main={android} shaded={android} />
      { children }
    </View>
  )
}

export default (TabView) => (props) => (
  <FeedTab>
    <TabView {...props} />
  </FeedTab>
)
