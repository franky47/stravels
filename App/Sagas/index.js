import stravaSaga from './StravaSagas'

export default function * root () {
  yield [
    stravaSaga()
  ]
}
