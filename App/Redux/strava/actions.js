
// Action Types --
const actions = {

  // OAuth
  OAuthAuthorizeRequest: 'STRAVA_OAUTH_AUTHORIZE_REQUEST',
  OAuthAuthorizeSuccess: 'STRAVA_OAUTH_AUTHORIZE_SUCCESS',
  OAuthAuthorizeFailure: 'STRAVA_OAUTH_AUTHORIZE_FAILURE',

  OAuthTokenExchangeRequest: 'STRAVA_OAUTH_TOKEN_EXCHANGE_REQUEST',
  OAuthTokenExchangeSuccess: 'STRAVA_OAUTH_TOKEN_EXCHANGE_SUCCESS',
  OAuthTokenExchangeFailure: 'STRAVA_OAUTH_TOKEN_EXCHANGE_FAILURE',

  LogoutRequest: 'STRAVA_LOGOUT_REQUEST',
  LogoutSuccess: 'STRAVA_LOGOUT_SUCCESS',
  LogoutFailure: 'STRAVA_LOGOUT_FAILURE',

  // User
  SetUser: 'STRAVA_SET_USER'
}
export default {
  types: actions
}

// Action Creators --

export const oauthAuthorizeRequest = () => ({
  type: actions.OAuthAuthorizeRequest
})
export const oauthAuthorizeSuccess = (code) => ({
  type: actions.OAuthAuthorizeSuccess,
  code
})
export const oauthAuthorizeFailure = (error) => ({
  type: actions.OAuthAuthorizeFailure,
  error
})

export const oauthTokenExchangeRequest = () => ({
  type: actions.OAuthTokenExchangeRequest
})
export const oauthTokenExchangeSuccess = (token) => ({
  type: actions.OAuthTokenExchangeSuccess,
  token
})
export const oauthTokenExchangeFailure = (error) => ({
  type: actions.OAuthTokenExchangeFailure,
  error
})

export const logoutRequest = () => ({
  type: actions.LogoutRequest
})
export const logoutSuccess = () => ({
  type: actions.LogoutSuccess
})
export const logoutFailure = (error) => ({
  type: actions.LogoutFailure,
  error
})

export const setUser = (user) => ({
  type: actions.SetUser,
  user
})
