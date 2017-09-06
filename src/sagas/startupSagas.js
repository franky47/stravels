import { put, call, select, takeEvery } from 'redux-saga/effects'
import { is } from 'ramda'
import selectors from '@stravels/redux/selectors'
import { actions as oauth } from '@stravels/redux/strava/oauth/actions'

// process STARTUP actions
export function * startupSaga (action) {
  const token = yield select(selectors.strava.oauth.getToken)
  if (is(String, token)) {
    yield put(oauth.login(token))
  }
}
export function * watchStartup () {
  yield call(takeEvery, 'STARTUP', startupSaga)
}

export default function * () {
  yield takeEvery('STARTUP', startupSaga)
}
