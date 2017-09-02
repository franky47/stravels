import { combineReducers } from 'redux'
import createStore from './createStore'
import rootSaga from '../sagas'

export default () => {
  const rootReducer = combineReducers({
    nav: require('./navigation').reducer,
    strava: require('./strava').reducer
  })

  return createStore(rootReducer, rootSaga)
}

export const selectors = {
  strava: require('./strava/selectors').create((state) => state.strava)
}
