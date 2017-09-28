// Structure
import React, { PureComponent } from 'react'
import { View, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import Checkbox from '@stravels/components/core/checkbox'

// Styles
import styles from './selectableRow.styles'
import { Colors } from '@stravels/themes'

export default class SelectableRow extends PureComponent {
  static propTypes = {
    id: PropTypes.any.isRequired,
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  }
  static defaultProps = {
    id: null,
    onPress: () => {},
    selected: false
  }

  onPress = () => {
    this.props.onPress(this.props.id)
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor={Colors.highlightUnderlay}
        onPress={this.onPress}
      >
        <View style={styles.mainContainer}>
          { this.props.children }
          <Checkbox
            style={styles.checkbox}
            size={24}
            checked={this.props.selected}
            onPress={this.onPress}
          />
        </View>
      </TouchableHighlight>
    )
  }
}
