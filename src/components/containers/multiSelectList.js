// Structure
import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import Checkbox from '@stravels/components/core/checkbox'

// Styles
import { Colors } from '@stravels/themes'

class SelectableRow extends Component {
  render () {
    return (
      <TouchableHighlight
        underlayColor={Colors.highlightUnderlay}
        onPress={this.onPress}
      >
        <View style={this.props.rowStyle}>
          { this.props.children }
          <Checkbox
            style={this.props.checkboxStyle}
            size={24}
            checked={this.props.selected}
            onPress={this.onPress}
          />
        </View>
      </TouchableHighlight>
    )
  }
  onPress = () => {
    this.props.onPress(this.props.id)
  }
}

// --

export default class MultiSelectList extends Component {
  static defaultProps = {
    selectedItems: new Set(),
    onSelectedItemsChange: (selectedItems) => {}
  }

  render () {
    const { ListType } = this.props
    return <ListType
      {...this.props}
      extraData={{...this.props.extraData, ...this.state}}
      renderItem={this.renderItem}
    />
  }

  renderItem = (info) => {
    const { item } = info
    const id = item.key || this.props.keyExtractor(item)
    const selected = this.props.selectedItems.has(id)
    const { rowStyle, checkboxStyle } = this.props
    return (
      <SelectableRow
        {...{ id, selected, rowStyle, checkboxStyle }}
        onPress={this.onItemPress}
      >
        { this.props.renderItem(info) }
      </SelectableRow>
    )
  }

  onItemPress = (id) => {
    const selected = new Set(this.props.selectedItems)
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    this.props.onSelectedItemsChange(selected)
  }
}
