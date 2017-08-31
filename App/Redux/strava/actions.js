
// Action Types --
const actions = {

  // OAuth
  OAuthAuthorizeRequest: 'Strava/OAuth/AUTHORIZE_REQUEST',
  OAuthAuthorizeSuccess: 'Strava/OAuth/AUTHORIZE_SUCCESS',
  OAuthAuthorizeFailure: 'Strava/OAuth/AUTHORIZE_FAILURE',

  OAuthTokenExchangeRequest: 'Strava/OAuth/TOKEN_EXCHANGE_REQUEST',
  OAuthTokenExchangeSuccess: 'Strava/OAuth/TOKEN_EXCHANGE_SUCCESS',
  OAuthTokenExchangeFailure: 'Strava/OAuth/TOKEN_EXCHANGE_FAILURE',

  Login: 'Strava/LOGIN',

  LogoutRequest: 'Strava/LOGOUT_REQUEST',
  LogoutSuccess: 'Strava/LOGOUT_SUCCESS',
  LogoutFailure: 'Strava/LOGOUT_FAILURE',

  // User
  SetUser: 'Strava/SET_USER',

  // Activities
  ActivitiesRequest: 'Strava/ACTIVITIES_REQUEST',
  ActivitiesSuccess: 'Strava/ACTIVITIES_SUCCESS',
  ActivitiesFailure: 'Strava/ACTIVITIES_FAILURE',

  // Friends
  FriendsRequest: 'Strava/FRIENDS_REQUEST',
  FriendsSuccess: 'Strava/FRIENDS_SUCCESS',
  FriendsFailure: 'Strava/FRIENDS_FAILURE'
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
