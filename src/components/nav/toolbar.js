import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function NavToolbar ({ children }) {
  return (
    <View style={styles.mainContainer} >
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    alignItems: 'stretch'
  }
})
