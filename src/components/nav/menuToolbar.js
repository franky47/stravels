import React from 'react'
import NavToolbar from './toolbar'
import NavToolbarIcon from './icon'

export default class MenuToolbar extends React.PureComponent {
  render () {
    return (
      <NavToolbar>
        <NavToolbarIcon icon='menu' color='white' onPress={this.onPress} />
      </NavToolbar>
    )
  }

  onPress = () => {
    this.props.navigation.navigate('DrawerOpen')
  }
}
