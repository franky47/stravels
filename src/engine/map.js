import Polyline from '@mapbox/polyline'
import simplify from 'simplify-js'
import { bbox } from '@turf/turf'

const decode = (p) => typeof p === 'string' ? Polyline.decode(p) : p

export const getPolylinesBounds = (polylines = [], padding = 1.0) => {
  let init = true
  const bounds = {
    n: 0, // lat
    s: 0, // lat
    e: 0, // lng
    w: 0  // lng
  }

  // todo: handle paths crossing the 180° longitude line

  polylines.forEach((data) => {
    const points = (typeof data === 'string') ? Polyline.decode(data) : data
    points.forEach(([lat, lng]) => {
      if (init) {
        bounds.n = bounds.s = lat
        bounds.e = bounds.w = lng
        init = false
      }

      bounds.n = Math.max(bounds.n, lat)
      bounds.s = Math.min(bounds.s, lat)
      bounds.e = Math.max(bounds.e, lng)
      bounds.w = Math.min(bounds.w, lng)
    })
  })

  // Expand the bounds with padding
  const centerLat = (bounds.n + bounds.s) * 0.5
  const centerLng = (bounds.e + bounds.w) * 0.5
  const radiusLat = (bounds.n - bounds.s) * 0.5 * padding
  const radiusLng = (bounds.e - bounds.w) * 0.5 * padding
  return {
    sw: {
      lat: centerLat - radiusLat,
      lng: centerLng - radiusLng
    },
    ne: {
      lat: centerLat + radiusLat,
      lng: centerLng + radiusLng
    }
  }
}

export const scaleBounds = (bounds, scale = 1.0) => {
  const center = {
    lat: (bounds.neLat + bounds.swLat) * 0.5,
    lng: (bounds.neLng + bounds.swLng) * 0.5
  }
  const radius = {
    lat: (bounds.neLat - bounds.swLat) * 0.5 * scale,
    lng: (bounds.neLng - bounds.swLng) * 0.5 * scale
  }
  return {
    swLat: center.lat - radius.lat,
    swLng: center.lng - radius.lng,
    neLat: center.lat + radius.lat,
    neLng: center.lng + radius.lng
  }
}

export const getPolylineBounds = (polyline) => bbox(decode(polyline))

export const simplifyPolyline = (polyline) => {
  const encoded = typeof polyline === 'string'

  let points = encoded ? Polyline.decode(polyline) : polyline
  points = points.map(([x, y]) => ({ x, y }))
  points = simplify(points, 0.001)
  points = points.map(({ x, y }) => [x, y])

  return encoded ? Polyline.encode(points) : points
}

export const getColorForIndex = (index) => {
  const colors = [
    '#7cb342',
    '#039be5',
    '#5e35b1',
    '#e53935',
    '#ffb300'
  ]
  return colors[index % colors.length]
}
