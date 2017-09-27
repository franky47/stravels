import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TravelsList from '@stravels/components/containers/travelsList'

class FeedTabYou extends PureComponent {
  render () {
    return <TravelsList
      data={this.props.data}
      onItemPress={this.onItemPress}
      onEmptyCallToActionPress={this.onEmptyCallToActionPress}
    />
  }
  onItemPress = (id) => {
    console.tron.log(id)
  }
  onEmptyCallToActionPress = () => {
    console.tron.log('Create new travel')
  }
}

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => {
  return {
    data: require('@stravels/fixtures/travels.json').reverse()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedTabYou)
