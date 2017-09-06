import { put, call, take, takeEvery } from 'redux-saga/effects'
import * as sagas from '@stravels/sagas/strava/oauthSagas'
import { types, actions } from '@stravels/redux/strava/oauth/actions'
import { actions as userActions } from '@stravels/redux/strava/user/actions'

describe('Authorization Saga', () => {
  test('Deep Link Channel', () => {
    const source = {
      addEventListener: jest.fn().mockImplementation((type, handler) => {}),
      removeEventListener: jest.fn().mockImplementation((type, handler) => {})
    }
    const channel = sagas.createDeepLinkChannel(source)
    expect(source.addEventListener).toHaveBeenCalled()
    expect(source.removeEventListener).not.toHaveBeenCalled()

    channel.close()
    expect(source.removeEventListener).toHaveBeenCalled()
  })

  test('success', () => {
    // Mocks
    const api = {
      generateOAuthAuthorizationRequestUrl: jest.fn(),
      handleOAuthAuthorizationResponse: jest.fn()
    }
    const linking = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      openURL: jest.fn()
    }
    const channel = sagas.createDeepLinkChannel(linking)

    const saga = sagas.authorizationSaga(api, linking)

    expect(saga.next().value).toEqual(call(sagas.createDeepLinkChannel, linking))
    expect(saga.next(channel).value).toEqual(call([api, api.generateOAuthAuthorizationRequestUrl]))
    expect(saga.next('foo').value).toEqual(call([linking, linking.openURL], 'foo'))
    expect(saga.next().value).toEqual(take(channel))
    expect(saga.next('bar').value).toEqual(call([channel, channel.close]))
    expect(saga.next().value).toEqual(call([api, api.handleOAuthAuthorizationResponse], 'bar'))
    expect(saga.next('code').value).toEqual(put(actions.authorizationSuccess('code')))
    expect(saga.next().done).toBe(true)
  })

  test('failure', () => {
    // Mocks
    const api = {
      generateOAuthAuthorizationRequestUrl: () => {},
      handleOAuthAuthorizationResponse: () => {}
    }
    const linking = {
      addEventListener: () => {},
      removeEventListener: () => {},
      openURL: () => {}
    }
    const error = new Error('error')

    const saga = sagas.authorizationSaga(api, linking)
    expect(saga.next().value).toEqual(call(sagas.createDeepLinkChannel, linking))
    expect(saga.throw(error).value).toEqual(put(actions.authorizationFailure(error)))
    expect(saga.next().done).toBe(true)
  })
})

describe('Token Exchange Saga', () => {
  test('success', () => {
    const api = {
      sendOAuthTokenExchangeRequest: () => {}
    }
    const request = actions.tokenExchangeRequest('code')
    const response = {
      token: 'token',
      user: 'user'
    }
    const saga = sagas.tokenExchangeSaga(api, request)
    expect(saga.next().value).toEqual(call([api, api.sendOAuthTokenExchangeRequest], 'code'))
    expect(saga.next(response).value).toEqual(put(actions.tokenExchangeSuccess('token', 'user')))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
  test('failure', () => {
    const error = new Error('error')
    const api = {
      sendOAuthTokenExchangeRequest: () => {}
    }
    const request = actions.tokenExchangeRequest('code')
    const saga = sagas.tokenExchangeSaga(api, request)
    expect(saga.next().value).toEqual(call([api, api.sendOAuthTokenExchangeRequest], 'code'))
    expect(saga.throw(error).value).toEqual(put(actions.tokenExchangeFailure(error)))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
})

describe('Logout Saga', () => {
  test('success', () => {
    const api = {
      logout: () => {},
      setAccessToken: () => {}
    }
    const request = actions.logoutRequest()
    const saga = sagas.logoutSaga(api, request)
    expect(saga.next().value).toEqual(call([api, api.logout]))
    expect(saga.next().value).toEqual(call([api, api.setAccessToken], null))
    expect(saga.next().value).toEqual(put(userActions.set(null)))
    expect(saga.next().value).toEqual(put(actions.logoutSuccess()))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
  test('failure', () => {
    const api = {
      logout: () => {}
    }
    const request = actions.logoutRequest()
    const saga = sagas.logoutSaga(api, request)
    const error = new Error('error')
    expect(saga.next().value).toEqual(call([api, api.logout]))
    expect(saga.throw(error).value).toEqual(put(actions.logoutFailure(error)))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
})

describe('Watchers', () => {
  test('authorization requests', () => {
    const saga = sagas.watchAuthorizationRequest('api', 'lnk')
    const actual = saga.next().value
    const expected = takeEvery(types.AUTHORIZATION_REQUEST,
                               sagas.authorizationSaga, 'api', 'lnk')
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
  test('token exchange requests', () => {
    const saga = sagas.watchTokenExchangeRequest('api')
    const actual = saga.next().value
    const expected = takeEvery(types.TOKEN_EXCHANGE_REQUEST,
                               sagas.tokenExchangeSaga, 'api')
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
  test('logout requests', () => {
    const saga = sagas.watchLogoutRequest('api')
    const actual = saga.next().value
    const expected = takeEvery(types.LOGOUT_REQUEST,
                               sagas.logoutSaga, 'api')
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
})

describe('Connections', () => {
  test('authorization to token exchange', () => {
    const trigger = actions.authorizationSuccess('code')
    const saga = sagas.connectAuthorizationToTokenExchange(trigger)
    const actual = saga.next().value
    const expected = put(actions.tokenExchangeRequest('code'))
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
  test('token exchange to login', () => {
    const trigger = actions.tokenExchangeSuccess('token', 'user')
    const saga = sagas.connectTokenExchangeToLogin(trigger)
    expect(saga.next().value).toEqual(put(actions.login('token')))
    expect(saga.next().value).toEqual(put(userActions.set('user')))
    expect(saga.next().done).toEqual(true)
  })
  test('login to api auth', () => {
    const api = {
      setAccessToken: () => {}
    }
    const trigger = actions.login('token')
    const saga = sagas.connectLoginToApiAuth(api, trigger)
    expect(saga.next().value).toEqual(call([api, api.setAccessToken], 'token'))
    expect(saga.next().done).toEqual(true)
  })
})

describe('Connection Watchers', () => {
  test('authorization success', () => {
    const saga = sagas.watchAuthorizationSuccess()
    const actual = saga.next().value
    const expected = takeEvery(types.AUTHORIZATION_SUCCESS,
                               sagas.connectAuthorizationToTokenExchange)
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
  test('token exchange success', () => {
    const saga = sagas.watchTokenExchangeSuccess()
    const actual = saga.next().value
    const expected = takeEvery(types.TOKEN_EXCHANGE_SUCCESS,
                               sagas.connectTokenExchangeToLogin)
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
  test('login', () => {
    const saga = sagas.watchLogin('api')
    const actual = saga.next().value
    const expected = takeEvery(types.LOGIN,
                               sagas.connectLoginToApiAuth, 'api')
    expect(actual).toEqual(expected)
    expect(saga.next().done).toEqual(true)
  })
})
