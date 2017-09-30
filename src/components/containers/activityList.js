// Structure
import React, { PureComponent } from 'react'
import { View, Text, SectionList, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import ActivityRow from '@stravels/components/activityRow'
import SelectableRow from './selectableRow'

// Styles
import styles from './activityList.styles'

// -----------------------------------------------------------------------------

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
)

// -----------------------------------------------------------------------------

export default class ActivityList extends PureComponent {
  static propTypes = {
    // Data
    sections: PropTypes.array.isRequired,
    keyExtractor: PropTypes.func.isRequired,

    // Behaviour
    selectedItems: PropTypes.instanceOf(Set).isRequired,
    onSelectedItemsChange: PropTypes.func,
    onEndReached: PropTypes.func,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    error: PropTypes.string,
    showBottomSpinner: PropTypes.bool
  }
  static defaultProps = {
    // Data
    sections: [],
    keyExtractor: (item) => item.id,

    // Behaviour
    selectedItems: [],
    onSelectedItemsChange: () => {},
    onEndReached: () => {},
    onRefresh: () => {},
    refreshing: false,
    error: null,
    showBottomSpinner: false
  }

  // --

  onItemPress = (id) => {
    const selected = new Set(this.props.selectedItems)
    if (selected.has(id)) {
      selected.delete(id)
    } else {
      selected.add(id)
    }
    this.props.onSelectedItemsChange(selected)
  }

  // --

  render () {
    return (
      <SectionList style={styles.mainContainer}
        // Data
        sections={this.props.sections}
        keyExtractor={this.props.keyExtractor}
        extraData={this.props.selectedItems}

        // Rendering
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderError}
        ListFooterComponent={this.renderSpinner}

        // Behaviour
        refreshing={this.props.refreshing}
        onEndReached={this.props.onEndReached}
        onRefresh={this.props.onRefresh}
      />
    )
  }

  // --

  renderItem = ({ item }) => {
    return (
      <SelectableRow
        id={item.id}
        selected={this.props.selectedItems.has(item.id)}
        onPress={this.onItemPress}
      >
        <ActivityRow
          title={item.name}
          elevation={item.total_elevation_gain}
          polyline={item.map.summary_polyline}
          {...item}
        />
      </SelectableRow>
    )
  }
  renderSeparator = () => <View style={styles.separator} />
  renderSectionHeader = ({section}) => <SectionHeader title={section.title} />
  renderError = () => {
    if (!this.props.error) return null
    try {
      return <Text>{JSON.stringify(this.props.error, null, 2)}</Text>
    } catch (except) {
      return <Text>{except}</Text>
    }
  }
  renderSpinner = () => {
    if (!this.props.showBottomSpinner) return null
    return <ActivityIndicator animating size='large' style={styles.spinner} />
  }
}
