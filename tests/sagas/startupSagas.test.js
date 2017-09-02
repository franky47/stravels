import { select, put } from 'redux-saga/effects'
import { startupSaga } from '../../App/Sagas/StartupSagas'
import actions from '../../App/Redux/StartupRedux'
import { selectors } from '../../App/Redux'
import { login } from '../../App/Redux/strava/actions'

test('startup with persisted token', () => {
  const action = actions.startup()
  const saga = startupSaga(action)
  expect(saga.next().value).toEqual(select(selectors.strava.getOAuthToken))
  expect(saga.next('token').value).toEqual(put(login('token')))
  expect(saga.next().done).toEqual(true)
})
test('startup without persisted token', () => {
  const action = actions.startup()
  const saga = startupSaga(action)
  expect(saga.next().value).toEqual(select(selectors.strava.getOAuthToken))
  expect(saga.next(undefined).done).toEqual(true)
})
