import * as sagas from '../../App/Sagas/StravaSagas'
import { put, call, take } from 'redux-saga/effects'
import * as actions from '../../App/Redux/strava/actions'

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

    const saga = sagas.authorizeSaga(api, linking)

    expect(saga.next().value).toEqual(call(sagas.createDeepLinkChannel, linking))
    expect(saga.next(channel).value).toEqual(call([api, api.generateOAuthAuthorizationRequestUrl]))
    expect(saga.next('foo').value).toEqual(call([linking, linking.openURL], 'foo'))
    expect(saga.next().value).toEqual(take(channel))
    expect(saga.next('bar').value).toEqual(call([channel, channel.close]))
    expect(saga.next().value).toEqual(call([api, api.handleOAuthAuthorizationResponse], 'bar'))
    expect(saga.next('code').value).toEqual(put(actions.oauthAuthorizeSuccess('code')))
    expect(saga.next().done).toBe(true)
  })
  test('failure', () => {
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
    const error = new Error('error')

    const saga = sagas.authorizeSaga(api, linking)

    expect(saga.next().value).toEqual(call(sagas.createDeepLinkChannel, linking))
    expect(saga.throw(error).value).toEqual(put(actions.oauthAuthorizeFailure(error)))
  })
})

describe('Token Exchange Saga', () => {
  test('success', () => {
    const api = {
      sendOAuthTokenExchangeRequest: () => {}
    }
    const request = actions.oauthTokenExchangeRequest('code')
    const response = {
      token: 'token',
      user: 'user'
    }
    const saga = sagas.tokenExchangeSaga(api, request)

    expect(saga.next().value).toEqual(call([api, api.sendOAuthTokenExchangeRequest], 'code'))
    expect(saga.next(response).value).toEqual(put(actions.oauthTokenExchangeSuccess('token', 'user')))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
  test('failure', () => {
    const error = new Error('error')
    const api = {
      sendOAuthTokenExchangeRequest: () => {}
    }
    const request = actions.oauthTokenExchangeRequest('code')
    const saga = sagas.tokenExchangeSaga(api, request)

    expect(saga.next().value).toEqual(call([api, api.sendOAuthTokenExchangeRequest], 'code'))
    expect(saga.throw(error).value).toEqual(put(actions.oauthTokenExchangeFailure(error)))
    const end = saga.next()
    expect(end.done).toEqual(true)
  })
})

describe('Logout Saga', () => {
  test('success', () => {
    const api = {
      logout: () => {}
    }
    const request = actions.logoutRequest()
    const saga = sagas.logoutSaga(api, request)

    expect(saga.next().value).toEqual(call([api, api.logout]))
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

describe('Logout while login flow', () => {

})
