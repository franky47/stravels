// Structure
import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import MultiPolylineMap from '@stravels/components/multiPolylineMap'
import StatsBanner from '@stravels/components/stats/banner'

// Behaviour
import selectors from '@stravels/redux/selectors'
import { computeStats } from '@stravels/engine/stats'

// Styles
import styles from './travel.styles'

class TravelScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='light-content' />
        <MultiPolylineMap
          style={styles.map}
          polylines={this.props.polylines}
          names={this.props.names}
          startPoints={this.props.startPoints}
          endPoints={this.props.endPoints}
        />
        <StatsBanner
          stats={this.props.stats}
        />
      </View>
    )
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {
  const { activitiesIds = [1134784244,
    1134370742,
    1131700492,
    1129988061
  ] } = ownProps.navigation.state.params || {}
  const filter = (activity) => activitiesIds.indexOf(activity.id) > -1
  const activities = selectors.strava.activities.getActivities(state).filter(filter)
  return {
    names: activities.map(a => a.name),
    polylines: activities.map(a => a.map.summary_polyline),
    startPoints: activities.map(a => a.start_latlng),
    endPoints: activities.map(a => a.end_latlng),
    stats: computeStats(activities)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelScreen)
