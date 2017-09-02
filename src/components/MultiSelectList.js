import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { FlatList, TouchableHighlight } from 'react-native'
import Checkbox from './Checkbox'

class MultiSelectRow extends Component {
  render () {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
      >
        { this.props.children }
        { this.props.showCheckbox &&
          <Checkbox
            checked={this.props.selected}
            onPress={this.props.onPress}
            color={this.props.checkboxColor}
          />
        }
      </TouchableHighlight>
    )
  }
}

export default class MultiSelectList extends Component {
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
  constructor (props) {
    super(props)
    this.state = {
      selectable: false,
      selected: []
    }
  }

  onRowPress (key) {
    const index = this.state.selected.indexOf(key)
    const select = (selected) => [...selected, key]
    const deselect = (selected) => {
      const copy = [...selected]
      copy.splice(index, 1)
      return copy
    }
    this.setState((state, props) => ({
      selected: (index > -1) ? deselect(state.selected) : select(state.selected)
    }))
  }
  onRowLongPress () {
    this.setState({
      selectable: true
    })
  }
  internalRenderItem (info) {
    const key = this.props.keyExtractor(info.item)
    return (
      <MultiSelectRow
        showCheckbox={this.state.selectable}
        selected={this.state.selected.indexOf(key) > -1}
        onPress={this.onRowLongPress.bind(this, key)}
        onLongPress={this.onRowLongPress.bind(this)}
        checkboxColor={this.props.checkboxColor}
      >
        {this.props.renderItem(info)}
      </MultiSelectRow>
    )
  }

  render () {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={this.internalRenderItem.bind(this)}
        keyExtractor={this.props.keyExtractor}
      />
    )
  }
}
