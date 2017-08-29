import stravaSaga from './StravaSagas'
import navigation from './NavigationSagas'

export default function * root () {
  yield [
    stravaSaga(),
    navigation()
  ]
}
