import deepFreeze from 'deep-freeze'
import { reducer } from '../../App/Redux/Strava'
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

describe('OAuth Authorization', () => {
  test('request', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.oauthAuthorizeRequest())
    const state = store.getState()

    expect(state.oauth.phase).toEqual('AUTHORIZE')
    expect(state.oauth.fetching).toEqual(true)
  })
  test('success', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.oauthAuthorizeSuccess('foobareggspam'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('AUTHORIZE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.error).toEqual(null)
  })
  test('failure', () => {
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
  test('successful flow', () => {
    const store = createStore(reducer)
    store.dispatch(actions.oauthAuthorizeRequest())
    store.dispatch(actions.oauthAuthorizeSuccess('code'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('AUTHORIZE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.error).toEqual(null)
  })
  test('failed flow', () => {
    const store = createStore(reducer)
    store.dispatch(actions.oauthAuthorizeRequest())
    store.dispatch(actions.oauthAuthorizeFailure('error'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('AUTHORIZE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.error).toEqual('error')
  })
})
describe('OAuth Token Exchange', () => {
  test('request', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.oauthTokenExchangeRequest())
    const state = store.getState()

    expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
    expect(state.oauth.fetching).toEqual(true)
  })
  test('success', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.oauthTokenExchangeSuccess('foobareggspam'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.error).toEqual(null)
  })
  test('failure', () => {
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
  test('successful flow', () => {
    const store = createStore(reducer)
    store.dispatch(actions.oauthTokenExchangeRequest())
    store.dispatch(actions.oauthTokenExchangeSuccess('token'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.error).toEqual(null)
  })
  test('failed flow', () => {
    const store = createStore(reducer)
    store.dispatch(actions.oauthTokenExchangeRequest())
    store.dispatch(actions.oauthTokenExchangeFailure('error'))
    const state = store.getState()

    expect(state.oauth.phase).toEqual('TOKEN_EXCHANGE')
    expect(state.oauth.fetching).toEqual(false)
    expect(state.oauth.token).toEqual(null)
    expect(state.oauth.error).toEqual('error')
  })
})
describe('Login with token', () => {
  test('token should be stored', () => {
    const store = createStore(reducer)
    store.dispatch(actions.login('token'))
    const actual = store.getState().oauth.token
    const expected = 'token'
    expect(actual).toEqual(expected)
  })
})
describe('Logout flow', () => {
  test('request', () => {
    const store = createStore(reducer)
    // Simulate successful oauth flows
    store.dispatch(actions.oauthAuthorizeRequest())
    store.dispatch(actions.oauthAuthorizeSuccess('code'))
    store.dispatch(actions.oauthTokenExchangeRequest())
    store.dispatch(actions.oauthTokenExchangeSuccess('token'))
    store.dispatch(actions.login('token'))

    const initialState = store.getState()
    deepFreeze(initialState)

    expect(initialState.oauth).toEqual({
      phase: 'LOGGED_IN',
      fetching: false,
      error: null,
      token: 'token'
    })

    store.dispatch(actions.logoutRequest())

    const actual = store.getState().oauth
    const expected = {
      phase: 'LOGOUT',
      fetching: true,
      error: null,
      token: 'token'
    }
    expect(actual).toEqual(expected)
  })
  test('success', () => {
    const store = createStore(reducer)
    store.dispatch(actions.login('token'))
    store.dispatch(actions.logoutSuccess())

    const actual = store.getState().oauth
    const expected = {
      phase: null,
      fetching: false,
      error: null,
      token: null
    }
    expect(actual).toEqual(expected)
  })
  test('failure', () => {
    const store = createStore(reducer)
    store.dispatch(actions.login('token'))
    store.dispatch(actions.logoutFailure('ohnoes'))

    const actual = store.getState().oauth
    const expected = {
      phase: 'LOGOUT',
      fetching: false,
      error: 'ohnoes',
      token: 'token'
    }
    expect(actual).toEqual(expected)
  })
})

describe('Activities', () => {
  test('request', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.activitiesRequest(42))
    const actual = store.getState().activities
    const expected = {
      data: {},
      fetching: true,
      error: null,
      page: 42
    }
    expect(actual).toEqual(expected)
  })
  test('success', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.activitiesSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    const actual = store.getState().activities
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' }
      },
      fetching: false,
      error: null,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('failure', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)
    const error = new Error('error')

    store.dispatch(actions.activitiesFailure(error))
    const actual = store.getState().activities
    const expected = {
      data: { },
      fetching: false,
      error,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('combine data', () => {
    const store = createStore(reducer)

    store.dispatch(actions.activitiesSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    store.dispatch(actions.activitiesSuccess({
      egg: { name: 'Egg' },
      spam: { name: 'Spam' }
    }))
    const actual = store.getState().activities
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' },
        egg: { name: 'Egg' },
        spam: { name: 'Spam' }
      },
      fetching: false,
      error: null,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('error does not drop data', () => {
    const store = createStore(reducer)

    store.dispatch(actions.activitiesSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    store.dispatch(actions.activitiesFailure('boo'))
    const actual = store.getState().activities
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' }
      },
      fetching: false,
      error: 'boo',
      page: 0
    }
    expect(actual).toEqual(expected)
  })
})

describe('Friends', () => {
  test('request', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.friendsRequest(42))
    const actual = store.getState().friends
    const expected = {
      data: {},
      fetching: true,
      error: null,
      page: 42
    }
    expect(actual).toEqual(expected)
  })
  test('success', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)

    store.dispatch(actions.friendsSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    const actual = store.getState().friends
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' }
      },
      fetching: false,
      error: null,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('failure', () => {
    const store = createStore(reducer)
    const initialState = store.getState()
    deepFreeze(initialState)
    const error = new Error('error')

    store.dispatch(actions.friendsFailure(error))
    const actual = store.getState().friends
    const expected = {
      data: { },
      fetching: false,
      error,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('combine data', () => {
    const store = createStore(reducer)

    store.dispatch(actions.friendsSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    store.dispatch(actions.friendsSuccess({
      egg: { name: 'Egg' },
      spam: { name: 'Spam' }
    }))
    const actual = store.getState().friends
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' },
        egg: { name: 'Egg' },
        spam: { name: 'Spam' }
      },
      fetching: false,
      error: null,
      page: 0
    }
    expect(actual).toEqual(expected)
  })
  test('error does not drop data', () => {
    const store = createStore(reducer)

    store.dispatch(actions.friendsSuccess({
      foo: { name: 'Foo' },
      bar: { name: 'Bar' }
    }))
    store.dispatch(actions.friendsFailure('boo'))
    const actual = store.getState().friends
    const expected = {
      data: {
        foo: { name: 'Foo' },
        bar: { name: 'Bar' }
      },
      fetching: false,
      error: 'boo',
      page: 0
    }
    expect(actual).toEqual(expected)
  })
})
