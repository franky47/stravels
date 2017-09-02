import qs from 'querystringify'
import { create as createApi } from '../../src/services/stravaApi'

describe('Strava API', () => {
  test('creation', () => {
    const api = createApi()
    expect(api).toBeInstanceOf(Object)

    // Config (Secrets are not available in testing environment)
    expect(api.config).toBeInstanceOf(Object)
    expect(api.config.baseUrl).toBeDefined()
    expect(api.config.clientId).toBeUndefined()
    expect(api.config.clientSecret).toBeUndefined()
    expect(api.config.oauthRedirectUri).toBeDefined()
  })
  test('custom config', () => {
    const config = {
      baseUrl: 'foo',
      clientId: 'bar',
      clientSecret: 'egg',
      oauthRedirectUri: 'spam'
    }
    const api = createApi(config)
    expect(api.config).toEqual(config)
  })
  test('partial custom config should have all the fields', () => {
    const partialConfig = {
      clientId: 'bar',
      clientSecret: 'egg'
    }
    const api = createApi(partialConfig)
    expect(api.config).toEqual({
      baseUrl: 'https://www.strava.com',
      oauthRedirectUri: 'stravels://localhost/auth/strava',
      ...partialConfig
    })
  })

  describe('OAuth Flow', () => {
    describe('generateOAuthAuthorizationRequestUrl', () => {
      test('has the required fields', () => {
        const config = {
          baseUrl: 'foo://bar/egg/spam',
          oauthRedirectUri: 'helloworld',
          clientId: 42
        }
        const api = createApi(config)
        const url = api.generateOAuthAuthorizationRequestUrl()
        expect(typeof url).toBe('string')

        const base = url.slice(0, url.indexOf('?'))
        const params = qs.parse(url.slice(url.indexOf('?')))
        expect(base).toEqual(config.baseUrl + '/oauth/authorize')
        expect(params.client_id).toBeDefined()
        expect(parseInt(params.client_id)).toEqual(42)
        expect(params.redirect_uri).toEqual('helloworld')
        expect(params.response_type).toEqual('code')
      })
    })

    describe('handleOAuthAuthorizationResponse', () => {
      test('should return a Promise', () => {
        const api = createApi()
        const p = api.handleOAuthAuthorizationResponse('foobareggspam')
        expect(p).toBeInstanceOf(Promise)
      })
      test('should parse valid url', async () => {
        const url = 'stravels://localhost/auth/strava?code=foobareggspam'
        const api = createApi()
        expect.assertions(1)
        const code = await api.handleOAuthAuthorizationResponse(url)
        expect(code).toEqual('foobareggspam')
      })
      test('should throw on invalid prefix', () => {
        const url = 'invalid'
        const api = createApi()
        expect.assertions(1)
        return expect(api.handleOAuthAuthorizationResponse(url))
          .rejects.toBeInstanceOf(Error)
      })
      test('should throw if url contains error field', () => {
        const url = 'stravels://localhost/auth/strava?error=ohnoes'
        const api = createApi()
        expect.assertions(1)
        return api.handleOAuthAuthorizationResponse(url)
          .catch((error) => {
            expect(error.message).toEqual('ohnoes')
          })
      })
      test('should throw if missing code field in url', () => {
        const url = 'stravels://localhost/auth/strava?hello=world'
        const api = createApi()
        expect.assertions(1)
        return expect(api.handleOAuthAuthorizationResponse(url))
          .rejects.toBeInstanceOf(Error)
      })
    })
  })
})
