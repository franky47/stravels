import { createReducer } from 'reduxsauce'
import { types } from './actions'

const DEFAULT_STATE = {
  id: null,
  email: '',
  firstname: '',
  lastname: '',
  profile: ''
}

const setUser = (state, { user }) => {
  if (user === null) {
    return DEFAULT_STATE
  } else {
    return {
      ...state,
      ...user
    }
  }
}

export default createReducer(DEFAULT_STATE, {
  [types.SET]: setUser
})
