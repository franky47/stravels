import { combineReducers } from 'redux'

// Sub-reducers
import oauth from './oauth'
import user from './user'
import activities from './activities'

export default combineReducers({
  oauth,
  user,
  activities
})
