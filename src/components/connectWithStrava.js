import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import { Images } from '@stravels/themes'

export default function ConnectWithStrava ({ onPress, style }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={style}
      underlayColor='transparent'
    >
      <Image source={Images.strava.connect.light} />
    </TouchableHighlight>
  )
}
