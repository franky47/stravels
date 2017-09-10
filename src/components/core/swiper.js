import React, { PureComponent } from 'react'
import { PanResponder, View } from 'react-native'

export default class Swiper extends PureComponent {
  componentWillMount () {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.props.onSwipeStart(gestureState)
      },
      onPanResponderMove: (evt, gestureState) => {
        this.props.onSwipeMove(gestureState)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          // swipe L/R
          if (gestureState.dx > 0) {
            this.props.onSwipeRight(gestureState)
          } else {
            this.props.onSwipeLeft(gestureState)
          }
        } else {
          // swipe U/D
          if (gestureState.dy > 0) {
            this.props.onSwipeUp(gestureState)
          } else {
            this.props.onSwipeDown(gestureState)
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.props.onSwipeCancelled(gestureState)
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true
      }
    })
  }

  render () {
    return (
      <View {...this.panResponder.panHandlers} style={this.props.style} >
        { this.props.children }
      </View>
    )
  }
}

Swiper.defaultProps = {
  onSwipeStart: () => {},
  onSwipeMove: () => {},
  onSwipeCancelled: () => {},

  onSwipeUp: () => {},
  onSwipeDown: () => {},
  onSwipeLeft: () => {},
  onSwipeRight: () => {}
}
