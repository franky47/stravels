import React, { Component } from 'react'
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native'
import styles from './Styles/MapViewStyle'

import Mapbox, { MapView as Map } from 'react-native-mapbox-gl'
import Secrets from 'react-native-config'

Mapbox.setAccessToken(Secrets.MAPBOX_ACCESS_TOKEN)

export default class MapView extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  static navigationOptions = {
    title: 'Map'
  };

  constructor (props) {
    super(props)
    this.state = {
      center: {
        latitude: 45.1836282,
        longitude: 5.7431109
      },
      zoom: 10
    }
  }

  configure (map) {
    this.map = map
    console.tron.log('Map configured.')
  }

  render () {
    return (
      <Map
        style={styles.container}
        initialCenterCoordinate={this.state.center}
        initialZoomLevel={this.state.zoom}
        ref={map => this.configure(map)}
        styleURL={'mapbox://styles/mapbox/outdoors-v10'}
      />
    )
  }
}
