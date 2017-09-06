import { createStore } from 'redux'
import reducer from '@stravels/redux/strava'
import createSelector from '@stravels/redux/strava/selectors'

const select = createSelector()

test('state should be combined', () => {
  const store = createStore(reducer)
  const state = store.getState()
  expect(state).toHaveProperty('oauth')
  expect(state).toHaveProperty('user')
  expect(state).toHaveProperty('activities')
  // expect(state).toHaveProperty('friends')
})
test('selectors keys should match state', () => {
  const store = createStore(reducer)
  const state = store.getState()
  for (const key in state) {
    expect(select).toHaveProperty(key)
  }
})

describe('OAuth', () => {
  test('selectors are propagated', () => {
    const store = createStore(reducer)
    const state = store.getState()
    expect(select.oauth.getToken(state)).toEqual(null)
  })
})
