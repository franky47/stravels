import Polyline from '@mapbox/polyline'

const defaultOptions = {
  start: {
    lat: 45,
    lng: 5
  },
  bearingSpread: 25,  // degrees, +/- from previous
  interval: 50,       // meters
  numPoints: 100
}

export default (options = defaultOptions) => {
  // Merge options
  const opt = {...defaultOptions, ...options}
  let previous = opt.start
  let bearing = opt.initialBearing || Math.random() * 360.0
  const data = new Array(opt.numPoints).fill(undefined).map(() => {
    const newBearing = bearing + (Math.random() * 2.0 - 1.0) * opt.bearingSpread
    const radius = opt.interval * 8e-6 // convert to angle delta
    const lat = previous.lat + radius * Math.cos(0.0174532925 * newBearing)
    const lng = previous.lng + radius * Math.sin(0.0174532925 * newBearing)
    previous = { lat, lng }
    bearing = newBearing
    return [lat, lng]
  })
  return Polyline.encode(data)
}
