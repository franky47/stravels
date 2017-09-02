import { select, put } from 'redux-saga/effects'
import { startupSaga } from '../../src/sagas/startupSagas'
import actions from '../../src/redux/startupRedux'
import { selectors } from '../../src/redux'
import { login } from '../../src/redux/strava/actions'

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
