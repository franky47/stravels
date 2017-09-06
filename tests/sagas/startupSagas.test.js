import { select, put } from 'redux-saga/effects'
import { startupSaga } from '@stravels/sagas/startupSagas'
import actions from '@stravels/redux/startupRedux'
import selectors from '@stravels/redux/selectors'
import { actions as oauth } from '@stravels/redux/strava/oauth/actions'

test('startup with persisted token', () => {
  const action = actions.startup()
  const saga = startupSaga(action)
  expect(saga.next().value).toEqual(select(selectors.strava.oauth.getToken))
  expect(saga.next('token').value).toEqual(put(oauth.login('token')))
  expect(saga.next().done).toEqual(true)
})
test('startup without persisted token', () => {
  const action = actions.startup()
  const saga = startupSaga(action)
  expect(saga.next().value).toEqual(select(selectors.strava.oauth.getToken))
  expect(saga.next(undefined).done).toEqual(true)
})
