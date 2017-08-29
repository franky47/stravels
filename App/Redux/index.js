import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    // github: require('./GithubRedux').reducer,
    // search: require('./SearchRedux').reducer,
    strava: require('./strava').reducer
  })

  return configureStore(rootReducer, rootSaga)
}

export const selectors = {
  strava: require('./strava/selectors').create((state) => state.strava)
}
