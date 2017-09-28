import React, { Component } from 'react'
import MapView from './map/mapbox'

// Behaviour
import { getColorForIndex } from '@stravels/engine/map'
import { isEqual } from 'lodash'
import turf from '@turf/turf'

export default class MultiPolylineMap extends Component {
  render () {
    return (
      <MapView
        style={{ flex: 1 }}
        ref={(map) => { this.map = map }}
        onFinishLoadingMap={this.onFinishLoadingMap}
        onTap={this.onTap}
        styleURL={this.props.styleUrl}
        annotations={this.getAnnotations()}
        // annotationsAreImmutable
      />
    )
  }

  // Lifecycle hooks --

  onFinishLoadingMap = () => {
    // map will not be ready on componentDidMount,
    // so use MapView's own lifecycle hook instead.
    this.updateViewport(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.updateViewport(nextProps)
    }
  }

  // --

  updateViewport = (props) => {
    // Make sure the index is valid
    const focused = props.focused !== undefined &&
                    props.focused >= 0 &&
                    props.focused < props.polylines.length
    const data = focused ? turf.lineString(props.polylines[props.focused])
                         : turf.multiLineString(props.polylines)
    const scale = focused ? 1.4 : 1.25
    this.map.setVisibleCoordinateBounds(...turf.bbox(turf.transformScale(data, scale)))
  }

  onTap = ({ latitude, longitude }) => {
    const point = turf.point([latitude, longitude])
    const index = this.props.polylines
      .map((polyline) => turf.lineString(polyline))
      .findIndex((line, index) => {
        const distance = turf.pointToLineDistance(point, line, 'kilometers')
        return distance <= 2.0
      })
    if (index !== -1) {
      this.props.setFocused(index)
    }
  }

  // Annotations --

  getAnnotations = () => [
    ...this.generatePolylines(),
    ...this.generateMarkers(this.props.startPoints, 'Start'),
    ...this.generateMarkers(this.props.endPoints, 'End')
  ]

  generatePolylines () {
    return this.props.polylines.map((coordinates, index) => {
      return {
        type: 'polyline',
        coordinates,
        strokeColor: getColorForIndex(index),
        strokeWidth: 3,
        id: this.props.names[index]
      }
    })
  }
  generateMarkers (source, label) {
    return source.map((coordinates, index) => ({
      coordinates,
      type: 'point',
      title: this.props.names[index],
      subtitle: label,
      id: `${this.props.names[index]} - ${label}`
    }))
  }
}

MultiPolylineMap.defaultProps = {
  styleUrl: 'mapbox://styles/mapbox/outdoors-v10',
  focused: undefined, // should be index of data arrays
  polylines: [],
  startPoints: [],
  endPoints: [],
  names: []
}
