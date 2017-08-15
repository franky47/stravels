import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Api from '../Services/FixtureApi'
import ActivityRow from '../Components/ActivityRow'

// Styles
import styles from './Styles/ActivityScreenStyle'

class ActivityScreen extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: Api.getActivities(),
      selectable: false,
      selected: []
    }
  }

  onRowPress (id) {
    const index = this.state.selected.indexOf(id)
    const select = (selected) => [...selected, id]
    const deselect = (selected) => {
      const copy = [...selected]
      copy.splice(index, 1)
      return copy
    }
    this.setState((state, props) => ({
      selected: (index > -1) ? deselect(state.selected) : select(state.selected)
    }))
  }
  onRowLongPress (id) {
    this.setState({
      selectable: true
    })
  }

  renderItem = ({item}) => {
    const selected = this.state.selected.indexOf(item.id) > -1
    return <ActivityRow
      title={item.name}
      type={item.type}
      distance={item.distance}
      elevation={item.total_elevation_gain}
      imageUri={'https://fse-avatars.surge.sh/fse.png'}
      checked={selected}
      selectable={this.state.selectable}
      onPress={this.onRowPress.bind(this, item.id)}
      onLongPress={this.onRowLongPress.bind(this, item.id)}
    />
  }

  render () {
    return <FlatList
      style={styles.container}
      data={this.state.data}
      extraData={this.state}
      renderItem={this.renderItem.bind(this)}
      keyExtractor={(item) => item.id}
    />
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen)
