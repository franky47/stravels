import { combineReducers } from 'redux'
import actions from './actions'

// OAuth State --

const OAUTH_DEFAULT_STATE = {
  phase: null,
  fetching: false,
  error: null,
  token: null
}

const oauthAuthorizeRequest = (state, action) => ({
  ...state,
  phase: 'AUTHORIZE',
  fetching: true
})
const oauthAuthorizeSuccess = (state, action) => ({
  ...state,
  phase: 'AUTHORIZE',
  fetching: false,
  error: null
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
const oauthTokenExchangeSuccess = (state, action) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error: null
})
const oauthTokenExchangeFailure = (state, { error }) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error
})
const oauthLogoutRequest = (state, action) => ({
  ...state,
  phase: 'LOGOUT',
  fetching: true
})
const oauthLogoutSuccess = (state, action) => OAUTH_DEFAULT_STATE
const oauthLogoutFailure = (state, { error }) => ({
  ...state,
  phase: 'LOGOUT',
  fetching: false,
  error
})

const login = (state, { token }) => ({
  ...state,
  phase: 'LOGGED_IN',
  token
})

const oauth = (state = OAUTH_DEFAULT_STATE, action) => {
  switch (action.type) {
    // OAuth Authorization Flow
    case actions.OAuthAuthorizeRequest:
      return oauthAuthorizeRequest(state, action)
    case actions.OAuthAuthorizeSuccess:
      return oauthAuthorizeSuccess(state, action)
    case actions.OAuthAuthorizeFailure:
      return oauthAuthorizeFailure(state, action)

    // OAuth Token Exchange Flow
    case actions.OAuthTokenExchangeRequest:
      return oauthTokenExchangeRequest(state, action)
    case actions.OAuthTokenExchangeSuccess:
      return oauthTokenExchangeSuccess(state, action)
    case actions.OAuthTokenExchangeFailure:
      return oauthTokenExchangeFailure(state, action)

    case actions.Login:
      return login(state, action)

    // Logout
    case actions.LogoutRequest:
      return oauthLogoutRequest(state, action)
    case actions.LogoutSuccess:
      return oauthLogoutSuccess(state, action)
    case actions.LogoutFailure:
      return oauthLogoutFailure(state, action)

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
  profile: ''
}

const setUser = (state, { user }) => {
  if (user === null) {
    return USER_DEFAULT_STATE
  } else {
    return {...state, ...user}
  }
}

const user = (state = USER_DEFAULT_STATE, action) => {
  switch (action.type) {
    case actions.SetUser:
      return setUser(state, action)
    default:
      return state
  }
}

// User State --

export const reducer = combineReducers({
  oauth,
  user
})
