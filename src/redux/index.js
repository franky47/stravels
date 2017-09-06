import { combineReducers } from 'redux'
import createStore from './createStore'
import rootSaga from '@stravels/sagas'

// Sub-reducers
import nav from './navigation'
import strava from './strava'
import settings from './settings'

export default () => {
  const rootReducer = combineReducers({
    nav,
    strava,
    settings
  })
  return createStore(rootReducer, rootSaga)
}
