import { call, put, takeEvery } from 'redux-saga/effects'
import actionTypes, * as actions from '../Redux/strava/actions'
import { Linking } from 'react-native'
import api from '../Services/StravaApi'

// --

export const startAuthorization = (dispatch) => {
  dispatch(actions.oauthAuthorizeRequest())
  function handleUrl (event) {
    api.handleOAuthAuthorizationResponse(event.url)
      .then((code) => dispatch(actions.oauthAuthorizeSuccess(code)))
      .catch((error) => dispatch(actions.oauthAuthorizeFailure(error)))
    Linking.removeEventListener('url', handleUrl)
  }
  Linking.addEventListener('url', handleUrl)
  return Linking.openURL(api.generateOAuthAuthorizationRequestUrl())
}

// --

function * startTokenExchange ({ code }) {
  yield put(actions.oauthTokenExchangeRequest(code))
}
export function * watchAuthorizationSuccess (action) {
  yield takeEvery(actionTypes.OAuthAuthorizationSuccess, startTokenExchange, action)
}

function * tokenExchangeFlow ({ code }) {
  try {
    const data = yield call(api.sendOAuthTokenExchangeRequest(code))
    yield put(actions.oauthTokenExchangeSuccess(data.token))
    yield put(actions.setUser(data.user))
    yield call(api.setAccessToken(data.token))
  } catch (error) {
    yield put(actions.oauthTokenExchangeFailure(error))
  }
}
export function * watchTokenExchange (action) {
  yield takeEvery(actionTypes.OAuthTokenExchangeRequest, tokenExchangeFlow, action)
}

// --

function * logoutFlow () {
  try {
    yield call(api.logout)
    yield put(actions.logoutSuccess())
    yield put(actions.setUser(null))
  } catch (error) {
    yield put(actions.logoutFailure(error))
  }
}
export function * watchLogout () {
  yield takeEvery(actionTypes.LogoutRequest, logoutFlow)
}
