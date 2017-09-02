import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AboutScreenStyle'

const pkg = require('../../package.json')

const AboutSection = (props) => (
  <View>
    <Text style={styles.section}>About</Text>
    <Text>Version {pkg.version}</Text>
  </View>
)
const DependenciesList = (props) => {
  const renderDep = ({ item }) => {
    const { name, version } = item
    return (
      <View style={styles.dependencyRow}>
        <Text style={styles.dependencyName}>{name}</Text>
        <Text style={styles.dependencyVersion}>{version}</Text>
      </View>
    )
  }
  const data = Object.keys(pkg.dependencies).map((name) => ({
    key: name,
    name,
    version: pkg.dependencies[name]
  }))
  return (
    <FlatList
      data={data}
      style={styles.dependencyList}
      renderItem={renderDep}
    />
  )
}

class AboutScreen extends Component {
  static navigationOptions = {
    title: 'About'
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <AboutSection />
          <DependenciesList />
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
