import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getVersion, getDependencies } from '../utility/about'

import NavToolbar from '../components/nav/toolbar'
import NavToolbarIcon from '../components/nav/icon'

// Styles
import styles from './about.styles'

const AboutSection = (props) => (
  <View>
    <Text style={styles.section}>About</Text>
    <Text>Version {getVersion()}</Text>
  </View>
)
const DependenciesList = (props) => {
  const renderDep = ({ item }) => {
    const { name, version } = item
    return (
      <View style={styles.dependencyRow}>
        <Text style={styles.dependencyName}>{name}</Text>
        <Text style={styles.dependencyVersion}>{version.resolved} ({version.spec})</Text>
      </View>
    )
  }
  const deps = getDependencies()
  const data = Object.keys(deps).map((name) => ({
    key: name,
    name,
    version: deps[name]
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
    headerRight: (
      <NavToolbar>
        <NavToolbarIcon icon='add' />
        <NavToolbarIcon icon='check' />
        <NavToolbarIcon icon='edit' />
        <NavToolbarIcon icon='delete' disabled />
      </NavToolbar>
    )
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
