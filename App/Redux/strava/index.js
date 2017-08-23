import { combineReducers } from 'redux'
import actions from './actions'

// OAuth State --

const OAUTH_DEFAULT_STATE = {
  phase: null,
  fetching: false,
  error: null,
  code: null,
  token: null
}

const oauthAuthorizeRequest = (state, action) => ({
  ...state,
  phase: 'AUTHORIZE',
  fetching: true
})
const oauthAuthorizeSuccess = (state, { code }) => ({
  ...state,
  phase: 'AUTHORIZE',
  fetching: false,
  error: null,
  code
})
const oauthAuthorizeFailure = (state, { error }) => ({
  ...state,
  phase: 'AUTHORIZE',
  fetching: false,
  error
})

const oauthTokenExchangeRequest = (state, action) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: true
})
const oauthTokenExchangeSuccess = (state, { token }) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error: null,
  token
})
const oauthTokenExchangeFailure = (state, { error }) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error
})
const logout = (state, action) => ({
  ...state,
  ...OAUTH_DEFAULT_STATE,
})

const oauth = (state = OAUTH_DEFAULT_STATE, action) => {
  switch (action.type) {
    // OAuth Authorization Flow
    case actions.types.OAuthAuthorizeRequest:
      return oauthAuthorizeRequest(state, action)
    case actions.types.OAuthAuthorizeSuccess:
      return oauthAuthorizeSuccess(state, action)
    case actions.types.OAuthAuthorizeFailure:
      return oauthAuthorizeFailure(state, action)

    // OAuth Token Exchange Flow
    case actions.types.OAuthTokenExchangeRequest:
      return oauthTokenExchangeRequest(state, action)
    case actions.types.OAuthTokenExchangeSuccess:
      return oauthTokenExchangeSuccess(state, action)
    case actions.types.OAuthTokenExchangeFailure:
      return oauthTokenExchangeFailure(state, action)

    case actions.types.Logout:
      return logout(state, action)
    default:
      return state
  }
}

// User State --

const USER_DEFAULT_STATE = {
  id: null,
  email: '',
  firstname: '',
  lastname: '',
  profile: '',
}

const setUser = (state, { user }) => ({
  ...state,
  ...user
})

const user = (state = USER_DEFAULT_STATE, action) => {
  switch (action.type) {
    case actions.types.SetUser:
      return setUser(state, action)
    default:
      return state
  }
}

// User State --

export default combineReducers({
  oauth,
  user
})
