import { all } from 'redux-saga/effects'
import startupSaga from './startupSagas'
import stravaSaga from './strava'
import navigation from './navigationSagas'

export default function * root () {
  yield all([
    startupSaga(),
    stravaSaga(),
    navigation()
  ])
}
