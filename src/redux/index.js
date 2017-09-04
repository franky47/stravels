import { combineReducers } from 'redux'
import createStore from './createStore'
import rootSaga from '@stravels/sagas'

export default () => {
  const rootReducer = combineReducers({
    nav: require('./navigation').reducer,
    strava: require('./strava').reducer,
    settings: require('./settings').reducer
  })

  return createStore(rootReducer, rootSaga)
}

export const selectors = {
  strava: require('./strava/selectors').create((state) => state.strava),
  settings: require('./settings/selectors').create((state) => state.settings)
}
