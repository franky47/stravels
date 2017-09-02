import React, { Component } from 'react'
// import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// import TravelCard from '../Components/TravelCard'

// Styles
import styles from './Styles/MainScreenStyle'

// import MapView from 'react-native-maps'
import { getPolylinesBounds } from '../Engine/map'

import Mapbox, { MapView as Map } from 'react-native-mapbox-gl'
import Secrets from 'react-native-config'
import polyline from '@mapbox/polyline'
// import { hslToHex } from '../Transforms/Colors'

Mapbox.setAccessToken(Secrets.MAPBOX_ACCESS_TOKEN)

const extractPolylines = (activities) => {
  const polylines = []
  activities.forEach((activity) => {
    polylines.push(polyline.decode(activity.map.summary_polyline))
  })
  return polylines
}

class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.activities = require('../Fixtures/activities.json')
    this.polylines = extractPolylines(this.activities)
  }

  configure (map) {
    this.map = map
    const bounds = getPolylinesBounds(this.polylines, 1.25)
    setTimeout(() => {
      this.map.setVisibleCoordinateBounds(
        bounds.sw.lat, bounds.sw.lng,
        bounds.ne.lat, bounds.ne.lng
      )
    }, 2000)
  }

  getAnnotations () {
    const annotations = []
    this.activities.forEach((activity) => {
      const coordinates = polyline.decode(activity.map.summary_polyline)
      annotations.push({
        title: activity.name,
        id: activity.id.toString(),
        type: 'polyline',
        coordinates,
        strokeColor: '#208020',
        strokeWidth: 3

      })
    })
    return annotations
  }

  render () {
    return <Map
      style={styles.container}
      ref={(map) => this.configure(map)}
      styleURL={'mapbox://styles/mapbox/outdoors-v10'}
      annotations={this.getAnnotations()}
    />
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onPress: () => dispatch({ type: 'PING', text: 'Hello, World !' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
