import { call, put, take, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import action, * as actions from '../Redux/strava/actions'
import { Linking } from 'react-native'
import stravaApi from '../Services/StravaApi'

export const createDeepLinkChannel = (source) => {
  return eventChannel((emit) => {
    const handleUrl = ({ url }) => emit(url)
    // Attach listener and return unsubscriber
    source.addEventListener('url', handleUrl)
    return () => source.removeEventListener('url', handleUrl)
  })
}

export function * authorizeSaga (api, linking) {
  try {
    const channel = yield call(createDeepLinkChannel, linking)
    const requestUrl = yield call([api, api.generateOAuthAuthorizationRequestUrl])
    yield call([linking, linking.openURL], requestUrl)
    const url = yield take(channel)
    yield call([channel, channel.close])
    const code = yield call([api, api.handleOAuthAuthorizationResponse], url)
    yield put(actions.oauthAuthorizeSuccess(code))
  } catch (error) {
    yield put(actions.oauthAuthorizeFailure(error))
  }
}

export function * tokenExchangeSaga (api, { code }) {
  try {
    const { token, user } = yield call([api, api.sendOAuthTokenExchangeRequest], code)
    yield put(actions.oauthTokenExchangeSuccess(token, user))
  } catch (error) {
    yield put(actions.oauthTokenExchangeFailure(error))
  }
}

export function * logoutSaga (api) {
  try {
    yield call([api, api.logout])
    yield put(actions.logoutSuccess())
  } catch (error) {
    yield put(actions.logoutFailure(error))
  }
}

// Main Saga Entrypoint --------------------------------------------------------

export default function * () {
  // Watchers
  yield takeEvery(action.OAuthAuthorizeRequest, authorizeSaga, stravaApi, Linking)
  yield takeEvery(action.OAuthTokenExchangeRequest, tokenExchangeSaga, stravaApi)
  yield takeEvery(action.LogoutRequest, logoutSaga, stravaApi)

  // Connections between side effects
  yield takeEvery(action.OAuthAuthorizeSuccess, function * ({code}) {
    yield put(actions.oauthTokenExchangeRequest(code))
  })
  yield takeEvery(action.OAuthTokenExchangeSuccess, function * ({ token, user }) {
    yield put(actions.login(token))
    yield put(actions.setUser(user))
  })
  yield takeEvery(action.Login, function * ({ token }) {
    yield call([stravaApi, stravaApi.setAccessToken], token)
  })
  yield takeEvery(action.LogoutSuccess, function * () {
    yield put(actions.setUser(null))
  })
}
