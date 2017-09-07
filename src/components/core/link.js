import React from 'React'
import { Text, Linking, TouchableHighlight } from 'react-native'

export default function Link ({ text, url, style }) {
  return (
    <TouchableHighlight
      onPress={() => Linking.openURL(url)}
      underlayColor='transparent'
    >
      <Text style={style}>{text}</Text>
    </TouchableHighlight>
  )
}
