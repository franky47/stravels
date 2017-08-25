import deepFreeze from 'deep-freeze'
import reducer from '../../App/Redux/Strava'
import * as actions from '../../App/Redux/Strava/actions'
import { createStore } from 'redux'

test('default state', () => {
  const store = createStore(reducer)
  const state = store.getState()
  expect(state.oauth).toBeDefined()
  expect(state.user).toBeDefined()

  expect(state.oauth).toEqual({
    phase: null,
    fetching: false,
    error: null,
    code: null,
    token: null
  })
  expect(state.user).toEqual({
    id: null,
    email: '',
    firstname: '',
    lastname: '',
    profile: ''
  })
})

test('oauth authorize request', () => {
  const store = createStore(reducer)
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthAuthorizeRequest())
  const state = store.getState()

  expect(state.oauth.phase).toEqual('AUTHORIZE')
  expect(state.oauth.fetching).toEqual(true)
})
test('oauth authorize success', () => {
  const store = createStore(reducer)
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthAuthorizeSuccess('foobareggspam'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('AUTHORIZE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.error).toEqual(null)
  expect(state.oauth.code).toEqual('foobareggspam')
})
test('oauth authorize failure', () => {
  const store = createStore(reducer)
  const error = new Error('foobareggspam')
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthAuthorizeFailure(error))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('AUTHORIZE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.error).toEqual(error)
})

test('oauth token exchange request', () => {
  const store = createStore(reducer)
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthTokenExchangeRequest())
  const state = store.getState()

  expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
  expect(state.oauth.fetching).toEqual(true)
})
test('oauth token exchange success', () => {
  const store = createStore(reducer)
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthTokenExchangeSuccess('foobareggspam'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.error).toEqual(null)
  expect(state.oauth.token).toEqual('foobareggspam')
})
test('oauth token exchange failure', () => {
  const store = createStore(reducer)
  const error = new Error('foobareggspam')
  const initialState = store.getState()
  deepFreeze(initialState)

  store.dispatch(actions.oauthTokenExchangeFailure(error))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.error).toEqual(error)
})

test('oauth authorize flow - success', () => {
  const store = createStore(reducer)
  store.dispatch(actions.oauthAuthorizeRequest())
  store.dispatch(actions.oauthAuthorizeSuccess('code'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('AUTHORIZE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.code).toEqual('code')
  expect(state.oauth.error).toEqual(null)
})

test('oauth authorize flow - failure', () => {
  const store = createStore(reducer)
  store.dispatch(actions.oauthAuthorizeRequest())
  store.dispatch(actions.oauthAuthorizeFailure('error'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('AUTHORIZE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.code).toEqual(null)
  expect(state.oauth.error).toEqual('error')
})

test('oauth token exchange flow - success', () => {
  const store = createStore(reducer)
  store.dispatch(actions.oauthTokenExchangeRequest())
  store.dispatch(actions.oauthTokenExchangeSuccess('token'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.token).toEqual('token')
  expect(state.oauth.error).toEqual(null)
})

test('oauth token exchange flow - failure', () => {
  const store = createStore(reducer)
  store.dispatch(actions.oauthTokenExchangeRequest())
  store.dispatch(actions.oauthTokenExchangeFailure('error'))
  const state = store.getState()

  expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.token).toEqual(null)
  expect(state.oauth.error).toEqual('error')
})

test('logout', () => {
  const store = createStore(reducer)
  // Simulate successful oauth flows
  store.dispatch(actions.oauthAuthorizeRequest())
  store.dispatch(actions.oauthAuthorizeSuccess('code'))
  store.dispatch(actions.oauthTokenExchangeRequest())
  store.dispatch(actions.oauthTokenExchangeSuccess('token'))
  const initialState = store.getState()
  deepFreeze(initialState)

  expect(initialState.oauth).toEqual({
    phase: 'TOKEN_EXCHANGE',
    fetching: false,
    error: null,
    token: 'token',
    code: 'code'
  })

  store.dispatch(actions.logout())
  const state = store.getState()

  expect(state.oauth.phase).toEqual(null)
  expect(state.oauth.fetching).toEqual(false)
  expect(state.oauth.error).toEqual(null)
  expect(state.oauth.code).toEqual(null)
  expect(state.oauth.token).toEqual(null)
})
