// Structure
import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MultiPolylineMap from '@stravels/components/multiPolylineMap'
import ProgressIndicator from '@stravels/components/map/progress'
import StatsBanner from '@stravels/components/stats/banner'

// Behaviour
import Polyline from '@mapbox/polyline'
import moment from 'moment'
import { sortBy } from 'lodash'
import { connect } from 'react-redux'
import selectors from '@stravels/redux/selectors'
import { computeStats } from '@stravels/engine/stats'
import Swiper from '@stravels/components/core/swiper'
import { prettifyDateRange } from '@stravels/transforms/prettify'
import { normalizeDistances } from '@stravels/transforms/activities'

// Styles
import styles from './travel.styles'

const BackToSummary = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={styles.backToSummaryButton}
      onPress={onPress}
      underlayColor='transparent'
    >
      <Icon name='zoom-out-map' size={24} />
    </TouchableHighlight>
  )
}

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
          setFocused={this.setFocused.bind(this)}
          focused={this.props.focused}
        />
        <BackToSummary
          onPress={this.setFocused.bind(this, undefined)}
        />
        <Swiper
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
        >
          <ProgressIndicator
            lengths={this.props.normalizedLengths}
            index={this.props.focused}
          />
          <View style={styles.titleBar}>
            <Text style={styles.title}>
              { this.props.focused === undefined ? 'Summary' : this.props.names[this.props.focused] }
            </Text>
            <Text style={styles.date}>
              { this.props.focused === undefined ? this.props.dateRange : this.props.dates[this.props.focused] }
            </Text>
          </View>
          <StatsBanner
            stats={this.props.stats}
          />
        </Swiper>
      </View>
    )
  }
  onSwipeLeft (gesture) {
    console.tron.log('swiped left')
    if (this.props.focused === undefined) {
      this.setFocused(0)
    } else if (this.props.focused === this.props.numSegments - 1) {
      this.setFocused(undefined)
    } else {
      this.setFocused(this.props.focused + 1)
    }
  }
  onSwipeRight (gesture) {
    if (this.props.focused === undefined) {
      this.setFocused(this.props.numSegments - 1)
    } else if (this.props.focused === 0) {
      this.setFocused(undefined)
    } else {
      this.setFocused(this.props.focused - 1)
    }
  }
  setFocused (index) {
    this.props.navigation.setParams({
      focused: index
    })
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {
  const navParams = ownProps.navigation.state.params || {}
  const { activitiesIds = [
    1129988061,
    1131700492,
    1134370742,
    1134784244
  ] } = navParams
  const activities = sortBy(selectors.strava.activities.getActivities(state)
    .filter((activity) => activitiesIds.indexOf(activity.id) > -1),
    (activity) => Date.parse(activity.start_date)
  )
  const focused = navParams.focused
  const stats = focused !== undefined ? computeStats([activities[focused]])
                                      : computeStats(activities)
  return {
    focused,
    stats,
    numSegments: activities.length,
    normalizedLengths: normalizeDistances(activities),
    names: activities.map(a => a.name),
    dates: activities.map(a => moment(a.start_date).format('Do MMMM YYYY')),
    polylines: activities.map(a => Polyline.decode(a.map.summary_polyline)),
    startPoints: activities.map(a => a.start_latlng),
    endPoints: activities.map(a => a.end_latlng),
    dateRange: prettifyDateRange(activities.map(a => a.start_date))
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelScreen)
