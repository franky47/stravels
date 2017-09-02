import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'
import { selectors } from '../Redux'
import StatsBanner from '../Components/StatsBanner'

import styles from './Styles/StatsScreenStyles'

class StatsScreen extends Component {
  render () {
    return <StatsBanner />
  }
}

const mapStateToProps = (state) => {
  return {

  }
  // {
  //   activity: (id) => selectors.strava.getActivity(state, id)
  // }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)
