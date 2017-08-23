import apisauce from 'apisauce'
import Secrets from 'react-native-config'
import { Linking } from 'react-native'
import qs from 'querystringify'
import EventEmitter from '../Utility/EventEmitter'

const create = () => {
  const baseUrl = `https://www.strava.com`
  const createApi = (basePath) => apisauce.create({
    baseURL: `${baseUrl}${basePath}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Secrets.STRAVA_ACCESS_TOKEN_RO}`
    }
  })

  const api = createApi('/api/v3')
  const oauthApi = createApi('/oauth')

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
    oauthApi.addMonitor(console.tron.apisauce)
  }
  usageEmitter = new EventEmitter()
  const usage = {
    short: null,
    long: null,
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
    usage.long  = usages[1] / limits[1]
    usageEmitter.notifyListeners(usage)
  }
  api.addMonitor(usageMonitor)

  // OAuth Flow --

  // We open the authorization URL in the device official browser
  // in order to have Google Sign In working. The redirect is a deep link
  // that must be handled and induce a call to handleOAuthAuthorizationResponse
  // with the received URL (which contains the authorization code).
  const oauthRedirectUri = 'stravels://localhost/auth/strava'

  const setAccessToken = (token) => {
    api.setHeaders('Authorization', `Bearer ${token}`)
    oauthApi.setHeader('Authorization', `Bearer ${token}`)
  }
  const sendOAuthAuthorizationRequest = () => {
    const params = {
      client_id: Secrets.STRAVA_CLIENT_ID,
      response_type: 'code',
      scope: 'view_private',
      redirect_uri: oauthRedirectUri,
      approval_prompt: __DEV__ ? 'force' : 'auto'
    }
    const url = `${baseUrl}/oauth/authorize` + qs.stringify(params, true)
    return Linking.openURL(url) // Promise
  }
  const handleOAuthAuthorizationResponse = (url) => {
    return new Promise((resolve, reject) => {
      if (!url.startsWith(oauthRedirectUri)) {
        throw new Error('Invalid Strava oauth redirection url')
      }
      const params = qs.parse(url.slice(url.indexOf('?')))
      if (params.error) {
        throw new Error(params.error)
      }
      if (!!params.code) {
        throw new Error('Could not read code')
      }
      resolve(params.code)
    })
  }
  const sendOAuthTokenExchangeRequest = (code) => {
    return oauthApi.post('/token', {
      client_id:     Secrets.STRAVA_CLIENT_ID,
      client_secret: Secrets.STRAVA_CLIENT_SECRET,
      code,
    }).then((response) => {
      const token = response.data.access_token
      setAccessToken(token)
      return {
        token,
        user: response.data.athlete
      }
    })
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

  return {
    // OAuth Flow
    setAccessToken,
    sendOAuthAuthorizationRequest,
    handleOAuthAuthorizationResponse,
    sendOAuthTokenExchangeRequest,
    sendLogoutRequest,

    // API Endpoints
    getAthlete,
    getAthleteById,
    getActivities,
    getActivityById,

    addUsageListener: usageEmitter.addListener,

    // For easy access to error codes etc..
    api,
    oauthApi,
  }
}

export default {
  create
}
