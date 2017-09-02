import qs from 'querystringify'
import axios from 'axios'
import Secrets from 'react-native-config'

export const create = (apiKey) => {
  const buildUrl = (config) => {
    // Size
    const w = config.width || 0
    const h = config.height || 0
    const size = `${w}x${h}`

    // Paths
    const paths = []
    for (const path of (config.paths || [])) {
      const weight = path.weight || 1
      const color = path.color || '0xff0000ff'
      const enc = (path.enc || '').replace('\\\\', '\\')
      const uri = `weight:${weight}|color:${color}|enc:${enc}`
      paths.push(uri)
    }

    const params = {
      size,
      key: apiKey
    }

    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap'
    return baseUrl + qs.stringify(params, true) + '&path=' + paths.join('&path=')
  }

  const get = (url) => {
    return axios.get(url)
  }

  return {
    buildUrl,
    get
  }
}

export default create(Secrets.GOOGLE_MAPS_API_KEY)
