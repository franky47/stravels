import startupSaga from './startupSagas'
import stravaSaga from './strava'
import navigation from './navigationSagas'

export default function * root () {
  yield [
    startupSaga(),
    stravaSaga(),
    navigation()
  ]
}
