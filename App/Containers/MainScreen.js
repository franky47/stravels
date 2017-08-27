import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// import TravelCard from '../Components/TravelCard'

// Styles
import styles from './Styles/MainScreenStyle'

const Button = (props) => (
  <TouchableHighlight onPress={props.onPress} style={{
    flex: 1
  }}>
    <Text>Foo</Text>
  </TouchableHighlight>
)

class MainScreen extends Component {
  render () {
    return <View style={styles.container}>
      <Button onPress={this.props.onPress} />
    </View>
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: () => dispatch({ type: 'PING', text: 'Hello, World !' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
