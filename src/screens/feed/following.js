import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import styles from './tab.styles'

class FeedTabFollowing extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Following Feed</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedTabFollowing)
