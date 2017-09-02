import { put, select, takeEvery } from 'redux-saga/effects'
import { is } from 'ramda'
import { selectors } from '../Redux'
import { login } from '../Redux/strava/actions'

// exported to make available for tests
export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
export function * startupSaga (action) {
  const token = yield select(selectors.strava.getOAuthToken)
  if (is(String, token)) {
    yield put(login(token))
  }
}

export default function * () {
  yield takeEvery('STARTUP', startupSaga)
}
