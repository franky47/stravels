import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import { Linking } from 'react-native'
import action, * as actions from '@stravels/redux/strava/actions'
import stravaApi from '@stravels/services/stravaApi'
import { arrayToObject } from '@stravels/transforms/convertShape'

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

export function * activitiesSaga (api, { page }) {
  try {
    const activities = (yield call([api, api.getActivities], page)).data
    const data = yield call(arrayToObject, activities, 'id')
    yield put(actions.activitiesSuccess(data))
  } catch (error) {
    yield put(actions.activitiesFailure(error))
  }
}

export function * friendsSaga (api, { page }) {
  try {
    const friends = (yield call([api, api.getFriends], page)).data
    const data = yield call(arrayToObject, friends, 'id')
    yield put(actions.friendsSuccess(data))
  } catch (error) {
    yield put(actions.friendsFailure(error))
  }
}

// Main Saga Entrypoint --------------------------------------------------------

export default function * () {
  // Watchers
  yield takeEvery(action.OAuthAuthorizeRequest, authorizeSaga, stravaApi, Linking)
  yield takeEvery(action.OAuthTokenExchangeRequest, tokenExchangeSaga, stravaApi)
  yield takeEvery(action.LogoutRequest, logoutSaga, stravaApi)
  yield takeEvery(action.ActivitiesRequest, activitiesSaga, stravaApi)
  yield takeEvery(action.FriendsRequest, friendsSaga, stravaApi)

  // Connections between side effects
  yield takeEvery(action.OAuthAuthorizeSuccess, function * ({ code }) {
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
