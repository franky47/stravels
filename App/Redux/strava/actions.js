
// Action Types --
const actions = {

  // OAuth
  OAuthAuthorizeRequest: 'STRAVA_OAUTH_AUTHORIZE_REQUEST',
  OAuthAuthorizeSuccess: 'STRAVA_OAUTH_AUTHORIZE_SUCCESS',
  OAuthAuthorizeFailure: 'STRAVA_OAUTH_AUTHORIZE_FAILURE',

  OAuthTokenExchangeRequest: 'STRAVA_OAUTH_TOKEN_EXCHANGE_REQUEST',
  OAuthTokenExchangeSuccess: 'STRAVA_OAUTH_TOKEN_EXCHANGE_SUCCESS',
  OAuthTokenExchangeFailure: 'STRAVA_OAUTH_TOKEN_EXCHANGE_FAILURE',

  Login: 'STRAVA_LOGIN',

  LogoutRequest: 'STRAVA_LOGOUT_REQUEST',
  LogoutSuccess: 'STRAVA_LOGOUT_SUCCESS',
  LogoutFailure: 'STRAVA_LOGOUT_FAILURE',

  // User
  SetUser: 'STRAVA_SET_USER',

  // Activities
  ActivitiesRequest: 'STRAVA_ACTIVITIES_REQUEST',
  ActivitiesSuccess: 'STRAVA_ACTIVITIES_SUCCESS',
  ActivitiesFailure: 'STRAVA_ACTIVITIES_FAILURE',

  // Friends
  FriendsRequest: 'STRAVA_FRIENDS_REQUEST',
  FriendsSuccess: 'STRAVA_FRIENDS_SUCCESS',
  FriendsFailure: 'STRAVA_FRIENDS_FAILURE'
}
export default actions

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

export const oauthTokenExchangeRequest = (code) => ({
  type: actions.OAuthTokenExchangeRequest,
  code
})
export const oauthTokenExchangeSuccess = (token, user) => ({
  type: actions.OAuthTokenExchangeSuccess,
  token,
  user
})
export const oauthTokenExchangeFailure = (error) => ({
  type: actions.OAuthTokenExchangeFailure,
  error
})

export const login = (token) => ({
  type: actions.Login,
  token
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

export const activitiesRequest = (page = 0) => ({
  type: actions.ActivitiesRequest,
  page
})
export const activitiesSuccess = (data) => ({
  type: actions.ActivitiesSuccess,
  data
})
export const activitiesFailure = (error) => ({
  type: actions.ActivitiesFailure,
  error
})

export const friendsRequest = (page = 0) => ({
  type: actions.FriendsRequest,
  page
})
export const friendsSuccess = (data) => ({
  type: actions.FriendsSuccess,
  data
})
export const friendsFailure = (error) => ({
  type: actions.FriendsFailure,
  error
})
