import { PixelRatio } from 'react-native'
import Secrets from 'react-native-config'

const defaultOptions = {
  width: 100,
  height: 100,
  retina: PixelRatio.get() > 1.0,
  format: 'png',
  mapId: 'mapbox.streets',
  strokeWidth: 4,
  strokeColor: 'f00',
  strokeOpacity: 1.0,
  fillColor: '000',
  fillOpacity: 0.0
}

export const getPolylineUrl = (polyline, options = defaultOptions) => {
  const opt = {...defaultOptions, ...options}
  const baseUrl = `https://api.mapbox.com/v4`
  const stroke = `${opt.strokeWidth}+${opt.strokeColor}-${opt.strokeOpacity}`
  const fill = `${opt.fillColor}-${opt.fillOpacity}`
  const overlay = `path-${stroke}+${fill}(${encodeURIComponent(polyline)})`
  const retina = opt.retina ? '@2x' : ''
  const token = Secrets.MAPBOX_ACCESS_TOKEN
  return `${baseUrl}/${opt.mapId}/${overlay}/auto/${opt.width}x${opt.height}${retina}.${opt.format}?access_token=${token}`
}
