import { call, put, takeEvery } from 'redux-saga/effects'
import action, * as actions from '../Redux/strava/actions'
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
export function * watchAuthorizationSuccess () {
  // todo: use symbol
  yield takeEvery(action.OAuthAuthorizeSuccess, startTokenExchange)
}

function * tokenExchangeFlow ({ code }) {
  try {
    const data = yield call(api.sendOAuthTokenExchangeRequest, code)
    console.tron.log(data)
    yield put(actions.oauthTokenExchangeSuccess(data.token))
    yield put(actions.setUser(data.user))
    yield put(actions.login(data.token))
  } catch (error) {
    yield put(actions.oauthTokenExchangeFailure(error))
  }
}
export function * watchTokenExchangeRequest () {
  yield takeEvery(action.OAuthTokenExchangeRequest, tokenExchangeFlow)
}

function * passTokenToApi ({ token }) {
  yield call(api.setAccessToken, token)
}

export function * watchLogin () {
  yield takeEvery(action.Login, passTokenToApi)
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
  yield takeEvery(action.LogoutRequest, logoutFlow)
}
