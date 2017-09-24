import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import styles from './tab.styles'

class FeedTabYou extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Your feed</Text>
      </View>
    )
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTabYou)
