import { select, put } from 'redux-saga/effects'
import { startupSaga } from '@stravels/sagas/startupSagas'
import actions from '@stravels/redux/startupRedux'
import { selectors } from '@stravels/redux'
import { login } from '@stravels/redux/strava/actions'

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
