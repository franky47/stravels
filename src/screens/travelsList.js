// Structure
import React, { PureComponent } from 'react'
import TravelsList from '@stravels/components/containers/travelsList'

// Behaviour
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class TravelsListScreen extends PureComponent {
  render () {
    return (
      <TravelsList
        data={this.props.data}
        onItemPress={this.props.overview}
        onEmptyCallToActionPress={this.props.selectActivities}
      />
    )
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  return {
    data: require('@stravels/fixtures/travels.json')
  }
}
const mapDispatchToProps = (dispatch) => {
  const { navigate } = NavigationActions
  return {
    selectActivities: () => dispatch(navigate({
      routeName: 'SelectActivities'
    })),
    overview: (id) => dispatch(navigate({
      routeName: 'TravelOverview',
      params: { id }
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelsListScreen)
