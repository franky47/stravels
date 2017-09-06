import { createStore } from 'redux'
import reducer, { DEFAULT_STATE } from '@stravels/redux/strava/oauth'
import { actions } from '@stravels/redux/strava/oauth/actions'
import createSelector from '@stravels/redux/strava/oauth/selectors'

const select = createSelector()

describe('Default State', () => {
  test('should match the exported value', () => {
    const store = createStore(reducer)
    const actual = store.getState()
    const expected = DEFAULT_STATE
    expect(actual).toEqual(expected)
  })
})

describe('OAuth Authorization', () => {
  test('request', () => {
    const store = createStore(reducer)
    store.dispatch(actions.authorizationRequest())
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('AUTHORIZATION')
    expect(select.isFetching(state)).toEqual(true)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual(null)
  })
  test('success', () => {
    const store = createStore(reducer)
    store.dispatch(actions.authorizationSuccess('code'))
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('AUTHORIZATION')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual(null)
  })
  test('failure', () => {
    const store = createStore(reducer)
    store.dispatch(actions.authorizationFailure('error'))
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('AUTHORIZATION')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual('error')
  })
  test('success should clear error', () => {
    const store = createStore(reducer)
    store.dispatch(actions.authorizationFailure('error'))
    store.dispatch(actions.authorizationSuccess('code'))
    expect(select.getError(store.getState())).toEqual(null)
  })
  test('request should not clear error', () => {
    const store = createStore(reducer)
    store.dispatch(actions.authorizationFailure('error'))
    store.dispatch(actions.authorizationRequest())
    expect(select.getError(store.getState())).toEqual('error')
  })
})

describe('OAuth Token Exchange', () => {
  test('request', () => {
    const store = createStore(reducer)
    store.dispatch(actions.tokenExchangeRequest())
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('TOKEN_EXCHANGE')
    expect(select.isFetching(state)).toEqual(true)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual(null)
  })
  test('success', () => {
    const store = createStore(reducer)
    store.dispatch(actions.tokenExchangeSuccess())
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('TOKEN_EXCHANGE')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual(null)
  })
  test('failure', () => {
    const store = createStore(reducer)
    store.dispatch(actions.tokenExchangeFailure('error'))
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('TOKEN_EXCHANGE')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual('error')
  })
  test('success should clear error', () => {
    const store = createStore(reducer)
    store.dispatch(actions.tokenExchangeFailure('error'))
    store.dispatch(actions.tokenExchangeSuccess())
    expect(select.getError(store.getState())).toEqual(null)
  })
  test('request should not clear error', () => {
    const store = createStore(reducer)
    store.dispatch(actions.tokenExchangeFailure('error'))
    store.dispatch(actions.tokenExchangeRequest())
    expect(select.getError(store.getState())).toEqual('error')
  })
})

describe('Login', () => {
  test('should set the token', () => {
    const store = createStore(reducer)
    store.dispatch(actions.login('token'))
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('LOGGED_IN')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual('token')
    expect(select.getError(state)).toEqual(null)
  })
})

describe('Logout', () => {
  test('request', () => {
    const store = createStore(reducer)
    store.dispatch(actions.logoutRequest())
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('LOGOUT')
    expect(select.isFetching(state)).toEqual(true)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual(null)
  })
  test('success', () => {
    const store = createStore(reducer)
    store.dispatch(actions.logoutSuccess())
    const actual = store.getState()
    expect(actual).toEqual(DEFAULT_STATE)
  })
  test('failure', () => {
    const store = createStore(reducer)
    store.dispatch(actions.logoutFailure('error'))
    const state = store.getState()
    expect(select.getPhase(state)).toEqual('LOGOUT')
    expect(select.isFetching(state)).toEqual(false)
    expect(select.getToken(state)).toEqual(null)
    expect(select.getError(state)).toEqual('error')
  })
  test('request should not clear token', () => {
    const store = createStore(reducer)
    store.dispatch(actions.login('token', 'user'))
    store.dispatch(actions.logoutRequest())
    const state = store.getState()
    expect(select.getToken(state)).toEqual('token')
  })
  test('request should not clear error', () => {
    const store = createStore(reducer)
    store.dispatch(actions.logoutFailure('error'))
    store.dispatch(actions.logoutRequest())
    expect(select.getError(store.getState())).toEqual('error')
  })
})
