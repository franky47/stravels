import apisauce from 'apisauce'
import Secrets from 'react-native-config'
import qs from 'querystringify'
import EventEmitter from '../Utility/EventEmitter'

// We open the authorization URL in the device official browser
// in order to have Google Sign In working. The redirect is a deep link
// that must be handled and induce a call to handleOAuthAuthorizationResponse
// with the received URL (which contains the authorization code).
const defaultConfig = {
  baseUrl: `https://www.strava.com`,
  clientId: Secrets.STRAVA_CLIENT_ID,
  clientSecret: Secrets.STRAVA_CLIENT_SECRET,
  oauthRedirectUri: 'stravels://localhost/auth/strava'
}

export const create = (config = defaultConfig) => {
  config = { ...defaultConfig, ...config }
  const createApi = (basePath) => apisauce.create({
    baseURL: config.baseUrl + basePath,
    headers: {
      Accept: 'application/json'
      // Authorization: `Bearer ${Secrets.STRAVA_ACCESS_TOKEN_RO}`
    }
  })

  const api = createApi('/api/v3')
  const oauthApi = createApi('/oauth')

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
    oauthApi.addMonitor(console.tron.apisauce)
  }

  // OAuth Flow --

  const setAccessToken = (token) => {
    api.setHeaders('Authorization', `Bearer ${token}`)
    oauthApi.setHeader('Authorization', `Bearer ${token}`)
  }
  const generateOAuthAuthorizationRequestUrl = () => {
    const params = {
      client_id: config.clientId,
      response_type: 'code',
      scope: 'view_private',
      redirect_uri: config.oauthRedirectUri,
      approval_prompt: __DEV__ ? 'force' : 'auto'
    }
    return config.baseUrl + '/oauth/authorize' + qs.stringify(params, true)
  }
  const handleOAuthAuthorizationResponse = (url) => {
    return new Promise((resolve, reject) => {
      if (!url.startsWith(config.oauthRedirectUri)) {
        throw new Error('Invalid Strava oauth redirection url')
      }
      const params = qs.parse(url.slice(url.indexOf('?')))
      if (params.error) {
        throw new Error(params.error)
      }
      if (!params.code) {
        throw new Error('Could not read code')
      }
      resolve(params.code)
    })
  }
  const sendOAuthTokenExchangeRequest = (code) => {
    return oauthApi.post('/token', {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code
    }).then((response) => ({
      token: response.data.access_token,
      user: response.data.athlete
    }))
  }
  const logout = () => {
    return oauthApi.post('/deauthorize')
  }

  // API Endpoints --

  const getAthlete = () => {
    return api.get('/athlete')
  }
  const getAthleteById = (id) => {
    return api.get(`/athletes/${id}`)
  }
  const getActivities = (page = 0) => {
    // Pages start at 1
    const params = page > 0 ? { page } : {}
    return api.get('/activities', { params })
  }
  const getActivityById = (id) => {
    return api.get(`/activities/${id}`)
  }

  // Usage --

  const usageEmitter = new EventEmitter()
  const usage = {
    short: null,
    long: null
  }
  const usageMonitor = (response) => {
    if (!!response.headers['X-RateLimit-Limit'] ||
        !!response.headers['X-RateLimit-Usage']) {
      return
    }
    const extract = (header) => response.headers[header].split(',').map((x) => parseInt(x))
    const limits = extract('X-RateLimit-Limit')
    const usages = extract('X-RateLimit-Usage')
    usage.short = usages[0] / limits[0]
    usage.long = usages[1] / limits[1]
    usageEmitter.notifyListeners(usage)
  }
  api.addMonitor(usageMonitor)

  const instance = {
    // OAuth Flow
    setAccessToken,
    generateOAuthAuthorizationRequestUrl,
    handleOAuthAuthorizationResponse,
    sendOAuthTokenExchangeRequest,
    logout,

    // API Endpoints
    getAthlete,
    getAthleteById,
    getActivities,
    getActivityById,

    // Usage
    addUsageListener: usageEmitter.addListener
  }
  // For testing
  if (__DEV__) {
    Object.defineProperty(instance, 'config', {
      value: config,
      writable: false
    })
  }

  return instance
}

export default create()
