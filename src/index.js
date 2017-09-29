import './config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './rootContainer'
import createStore from './redux'
import { wrapReactotronOverlay, wrapCodePush } from './utility/hof'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default wrapCodePush(wrapReactotronOverlay(App))
