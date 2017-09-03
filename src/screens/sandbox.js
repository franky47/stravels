import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'

import styles from './sandbox.styles'

class SandboxScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      foo: 'bar'
    }
  }

  render () {
    return (
      <View style={styles.mainContainer} >
        <Text>Sandbox</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SandboxScreen)
