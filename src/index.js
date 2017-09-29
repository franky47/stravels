import './config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './rootContainer'
import createStore from './redux'
import { wrapReactotronOverlay, wrapCodePush } from './utility/hof'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  store = createStore()

  render () {
    return (
      <Provider store={this.store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default wrapCodePush(wrapReactotronOverlay(App))
