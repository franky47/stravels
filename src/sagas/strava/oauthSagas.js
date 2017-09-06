import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import { Linking } from 'react-native'
import { types, actions } from '@stravels/redux/strava/oauth/actions'
import { actions as userActions } from '@stravels/redux/strava/user/actions'

export const createDeepLinkChannel = (source) => {
  return eventChannel((emit) => {
    const handleUrl = ({ url }) => emit(url)
    // Attach listener and return unsubscriber
    source.addEventListener('url', handleUrl)
    return () => source.removeEventListener('url', handleUrl)
  })
}

export function * authorizationSaga (api, linking) {
  try {
    const channel = yield call(createDeepLinkChannel, linking)
    const requestUrl = yield call([api, api.generateOAuthAuthorizationRequestUrl])
    yield call([linking, linking.openURL], requestUrl)
    const url = yield take(channel)
    yield call([channel, channel.close])
    const code = yield call([api, api.handleOAuthAuthorizationResponse], url)
    yield put(actions.authorizationSuccess(code))
  } catch (error) {
    yield put(actions.authorizationFailure(error))
  }
}

export function * tokenExchangeSaga (api, { code }) {
  try {
    const { token, user } = yield call([api, api.sendOAuthTokenExchangeRequest], code)
    yield put(actions.tokenExchangeSuccess(token, user))
  } catch (error) {
    yield put(actions.tokenExchangeFailure(error))
  }
}

export function * logoutSaga (api) {
  try {
    yield call([api, api.logout])
    yield call([api, api.setAccessToken], null)
    yield put(userActions.set(null))
    yield put(actions.logoutSuccess())
  } catch (error) {
    yield put(actions.logoutFailure(error))
  }
}

// Connections
export function * connectAuthorizationToTokenExchange ({ code }) {
  yield put(actions.tokenExchangeRequest(code))
}
export function * connectTokenExchangeToLogin ({ token, user }) {
  yield put(actions.login(token))
  yield put(userActions.set(user))
}
export function * connectLoginToApiAuth (api, { token }) {
  yield call([api, api.setAccessToken], token)
}

// Watchers
export function * watchAuthorizationRequest (api, linking) {
  yield call(takeEvery, types.AUTHORIZATION_REQUEST, authorizationSaga, api, linking)
}
export function * watchTokenExchangeRequest (api) {
  yield call(takeEvery, types.TOKEN_EXCHANGE_REQUEST, tokenExchangeSaga, api)
}
export function * watchLogoutRequest (api) {
  yield call(takeEvery, types.LOGOUT_REQUEST, logoutSaga, api)
}

// Connection watchers
export function * watchAuthorizationSuccess () {
  yield call(takeEvery, types.AUTHORIZATION_SUCCESS, connectAuthorizationToTokenExchange)
}
export function * watchTokenExchangeSuccess () {
  yield call(takeEvery, types.TOKEN_EXCHANGE_SUCCESS, connectTokenExchangeToLogin)
}
export function * watchLogin (api) {
  yield call(takeEvery, types.LOGIN, connectLoginToApiAuth, api)
}

export default function * (api) {
  yield [
    // Watchers
    watchAuthorizationRequest(api, Linking),
    watchTokenExchangeRequest(api),
    watchLogoutRequest(api),

    // Connection watchers
    watchAuthorizationSuccess(),
    watchTokenExchangeSuccess(),
    watchLogin(api)
  ]
}
