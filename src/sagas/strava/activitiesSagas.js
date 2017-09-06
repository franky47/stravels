import { put, call, select, throttle } from 'redux-saga/effects'
import { isEmpty, intersectionBy } from 'lodash'
import { types, actions } from '@stravels/redux/strava/activities/actions'
import selectors from '@stravels/redux/selectors'
import { getOldestUnixDate } from '@stravels/transforms/activities'

const intersects = (a, b) => {
  if (isEmpty(a) || isEmpty(b)) {
    return true
  }
  return !isEmpty(intersectionBy(a, b, 'id'))
}

export function * requestHeadSaga (api) {
  try {
    const stateActivities = yield select(selectors.strava.activities.getActivities)
    const params = {}
    let apiActivities = []
    do {
      const { data } = yield call([api, api.getActivities], params)
      apiActivities = apiActivities.concat(data)
      params.before = getOldestUnixDate(apiActivities)
      // \todo: add delay here to avoid swarming the API
    } while (!intersects(apiActivities, stateActivities))
    yield put(actions.success(apiActivities, 'head'))
  } catch (error) {
    yield put(actions.failure(error))
  }
}

export function * requestTailSaga (api) {
  try {
    const stateActivities = yield select(selectors.strava.activities.getActivities)
    const location = isEmpty(stateActivities) ? 'head' : 'tail'
    const params = isEmpty(stateActivities) ? {} : {
      before: getOldestUnixDate(stateActivities)
    }
    const { data } = yield call([api, api.getActivities], params)
    if (isEmpty(data)) {
      yield put(actions.setEof())
    }
    yield put(actions.success(data, location))
  } catch (error) {
    yield put(actions.failure(error))
  }
}

export function * tailSwitch (api) {
  const isEof = yield select(selectors.strava.activities.isEof)
  if (!isEof) {
    yield call(requestTailSaga, api)
  }
}

// Watchers
export function * watchRequestHead (api) {
  yield throttle(1000, types.REQUEST_HEAD, requestHeadSaga, api)
}
export function * watchRequestTail (api) {
  yield throttle(1000, types.REQUEST_TAIL, tailSwitch, api)
}

export default function * (api) {
  yield [
    // Watchers
    watchRequestHead(api),
    watchRequestTail(api)
  ]
}
