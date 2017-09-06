import React, { Component } from 'react'
import Mapbox, { MapView } from 'react-native-mapbox-gl'
// import styles from './multiPolylineMap.styles'
import Secrets from 'react-native-config'

// Behaviour
import { getPolylinesBounds, getColorForIndex } from '@stravels/engine/map'
import Polyline from '@mapbox/polyline'

Mapbox.setAccessToken(Secrets.MAPBOX_ACCESS_TOKEN)

export default class MultiPolylineMap extends Component {
  onFinishLoadingMap () {
    const bounds = getPolylinesBounds(this.props.polylines, 1.25)
    this.map.setVisibleCoordinateBounds(bounds.sw.lat, bounds.sw.lng,
                                        bounds.ne.lat, bounds.ne.lng)
  }

  render () {
    const annotations = [
      ...this._generatePolylines(),
      ...this._generateMarkers(this.props.startPoints, 'Start'),
      ...this._generateMarkers(this.props.endPoints, 'End')
    ]
    return (
      <MapView
        style={{ flex: 1 }}
        ref={(map) => { this.map = map }}
        styleURL='mapbox://styles/mapbox/outdoors-v10'
        annotations={annotations}
        onFinishLoadingMap={this.onFinishLoadingMap.bind(this)}
      />
    )
  }
  _generatePolylines () {
    return this.props.polylines.map((polyline, index) => ({
      type: 'polyline',
      coordinates: Polyline.decode(polyline),
      strokeColor: getColorForIndex(index),
      strokeWidth: 3,
      strokeAlpha: 1.0,
      id: this.props.names[index]
    }))
  }
  _generateMarkers (source, label) {
    return source.map((coordinates, index) => ({
      coordinates,
      type: 'point',
      title: this.props.names[index],
      subtitle: label,
      id: `${this.props.names[index]} - ${label}`
    }))
  }
 }
