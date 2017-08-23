
// Action Types --
const actions = {

  // OAuth
  OAuthAuthorizeRequest: 'STRAVA_OAUTH_AUTHORIZE_REQUEST',
  OAuthAuthorizeSuccess: 'STRAVA_OAUTH_AUTHORIZE_SUCCESS',
  OAuthAuthorizeFailure: 'STRAVA_OAUTH_AUTHORIZE_FAILURE',

  OAuthTokenExchangeRequest: 'STRAVA_OAUTH_TOKEN_EXCHANGE_REQUEST',
  OAuthTokenExchangeSuccess: 'STRAVA_OAUTH_TOKEN_EXCHANGE_SUCCESS',
  OAuthTokenExchangeFailure: 'STRAVA_OAUTH_TOKEN_EXCHANGE_FAILURE',

  Logout: 'STRAVA_LOGOUT',

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

export const logout = () => ({
  type: actions.Logout
})

export const setUser = (user) => ({
  type: actions.SetUser,
  user
})
