// Source:
// https://medium.com/technoetics/adding-image-placeholders-in-react-native-the-right-way-9140e78ac5c2

import React, { Component } from 'react'
import { Animated, View } from 'react-native'

export default class ProgressiveImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholderOpacity: new Animated.Value(1.0)
    }
  }

  onLoad () {
    Animated.timing(this.state.placeholderOpacity, {
      toValue: 0,
      duration: 250
    }).start()
  }

  render () {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
      >
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            { position: 'absolute' },
            this.props.style
          ]}
          source={this.props.source}
          onLoad={this.onLoad.bind(this)}
        />
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              backgroundColor: '#e9eef1',
              opacity: this.state.placeholderOpacity
            },
            this.props.style
          ]}
          source={this.props.placeholder}
        />
      </View>
    )
  }
}
