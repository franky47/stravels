// Structure
import React, { PureComponent } from 'react'
import { View, Text, Button, FlatList, TouchableHighlight } from 'react-native'
import TravelRow from '@stravels/components/travelRow'

// Styles
import styles from './travelsList.styles'
import { Colors } from '@stravels/themes'

class TouchableRow extends PureComponent {
  render () {
    return (
      <TouchableHighlight
        underlayColor={Colors.highlightUnderlay}
        onPress={this.onPress}
      >
        <View style={styles.row}>
          <TravelRow
            title={this.props.name}
            start_date={this.props.start_date}
            end_date={this.props.end_date}
          />
        </View>
      </TouchableHighlight>
    )
  }
  onPress = () => {
    this.props.onPress(this.props.id)
  }
}

export default class TravelsList extends PureComponent {
  render () {
    if (this.props.data.length === 0) {
      return this.renderEmpty()
    }
    return (
      <FlatList
        style={styles.mainContainer}
        data={this.props.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }

  keyExtractor = (item) => item.id
  renderItem = ({ item }) => (
    <TouchableRow
      onPress={this.props.onItemPress}
      {...item}
    />
  )
  renderSeparator = () => <View style={styles.separator} />
  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Let's get started !
      </Text>
      { this.props.onEmptyCallToActionPress &&
        <Button
          style={styles.emptyCallToAction}
          onPress={this.props.onEmptyCallToActionPress}
          title='Create Travel'
        />
      }
    </View>
  )
}
