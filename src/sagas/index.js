import startupSaga from './StartupSagas'
import stravaSaga from './StravaSagas'
import navigation from './NavigationSagas'

export default function * root () {
  yield [
    startupSaga(),
    stravaSaga(),
    navigation()
  ]
}
