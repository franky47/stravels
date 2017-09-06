import { createActions } from 'reduxsauce'

const config = {
  // OAuth Flow
  authorizationRequest: null,
  authorizationSuccess: ['code'],
  authorizationFailure: ['error'],
  tokenExchangeRequest: ['code'],
  tokenExchangeSuccess: ['token', 'user'],
  tokenExchangeFailure: ['error'],

  // Login
  login: ['token'],

  // Logout
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: ['error']
}

const { Types, Creators } = createActions(config, {
  prefix: 'Strava/OAuth/'
})

export {
  Types as types,
  Creators as actions
}
