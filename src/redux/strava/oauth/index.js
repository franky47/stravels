import { createReducer } from 'reduxsauce'
import { types } from './actions'

export const DEFAULT_STATE = {
  phase: null,
  fetching: false,
  error: null,
  token: null
}

// -----------------------------------------------------------------------------

const authorizationRequest = (state, action) => ({
  ...state,
  phase: 'AUTHORIZATION',
  fetching: true
})
const authorizationSuccess = (state, action) => ({
  ...state,
  phase: 'AUTHORIZATION',
  fetching: false,
  error: null
})
const authorizationFailure = (state, { error }) => ({
  ...state,
  phase: 'AUTHORIZATION',
  fetching: false,
  error
})

// -----------------------------------------------------------------------------

const tokenExchangeRequest = (state, action) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: true
})
const tokenExchangeSuccess = (state, action) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error: null
})
const tokenExchangeFailure = (state, { error }) => ({
  ...state,
  phase: 'TOKEN_EXCHANGE',
  fetching: false,
  error
})

// -----------------------------------------------------------------------------

const login = (state, { token }) => ({
  ...state,
  phase: 'LOGGED_IN',
  token
})

// -----------------------------------------------------------------------------

const logoutRequest = (state, action) => ({
  ...state,
  phase: 'LOGOUT',
  fetching: true
})
const logoutSuccess = (state, action) => DEFAULT_STATE
const logoutFailure = (state, { error }) => ({
  ...state,
  phase: 'LOGOUT',
  fetching: false,
  error
})

const handlers = {
  // OAuth Flow
  [types.AUTHORIZATION_REQUEST]: authorizationRequest,
  [types.AUTHORIZATION_SUCCESS]: authorizationSuccess,
  [types.AUTHORIZATION_FAILURE]: authorizationFailure,
  [types.TOKEN_EXCHANGE_REQUEST]: tokenExchangeRequest,
  [types.TOKEN_EXCHANGE_SUCCESS]: tokenExchangeSuccess,
  [types.TOKEN_EXCHANGE_FAILURE]: tokenExchangeFailure,

  // Login
  [types.LOGIN]: login,

  // Logout
  [types.LOGOUT_REQUEST]: logoutRequest,
  [types.LOGOUT_SUCCESS]: logoutSuccess,
  [types.LOGOUT_FAILURE]: logoutFailure
}

export default createReducer(DEFAULT_STATE, handlers)
