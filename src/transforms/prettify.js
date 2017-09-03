import moment from 'moment'

export const prettifyDistance = (meters = 0) => {
  const km = meters >= 1000.0
  return {
    value: (meters * (km ? 0.001 : 1.0)).toFixed(2),
    unit: meters >= 1000.0 ? 'km' : 'm'
  }
}

export const prettifyElevation = (meters = 0) => ({
  value: meters.toFixed(0),
  unit: 'm'
})

export const prettifyDuration = (seconds = 0) => ({
  value: moment.duration(seconds, 'seconds').asHours().toFixed(1),
  unit: 'h'
})

export const prettifyKilojoules = (kilojoules = 0) => {
  const factor = kilojoules < 1000.0 ? (kilojoules < 1.0 ? 1000.0 : 1.0) : 0.001
  const unit = kilojoules < 1000.0 ? (kilojoules < 1.0 ? 'J' : 'kJ') : 'MJ'
  return {
    value: (kilojoules * factor).toFixed(2),
    unit
  }
}

export const prettifyWatts = (watts = 0) => {
  const km = watts >= 1000.0
  return {
    value: (watts * km ? 0.001 : 1.0).toFixed(2),
    unit: watts >= 1000.0 ? 'kW' : 'W'
  }
}

export const prettifyMass = (kilograms = 0) => {
  const factor = kilograms < 1000.0 ? (kilograms < 1.0 ? 1000.0 : 1.0) : 0.001
  const unit = kilograms < 1000.0 ? (kilograms < 1.0 ? 'g' : 'kg') : 'tons'
  return {
    value: (kilograms * factor).toFixed(2),
    unit
  }
}

export const prettifySpeed = (metersPerSecond = 0) => ({
  value: (metersPerSecond * 3.6).toFixed(2),
  unit: 'km/h'
})

export const prettifyStats = (stats) => ({
  distance: prettifyDistance(stats.distance),
  total_elevation_gain: prettifyElevation(stats.total_elevation_gain),
  moving_time: prettifyDuration(stats.moving_time),
  kilojoules: prettifyKilojoules(stats.kilojoules),
  achievement_count: Math.round(stats.achievement_count),
  max_speed: prettifySpeed(stats.max_speed),
  elev_high: prettifyElevation(stats.elev_high),
  elev_low: prettifyElevation(stats.elev_low),
  average_watts: prettifyWatts(stats.average_watts),
  average_speed: prettifySpeed(stats.average_speed),
  average_distance: prettifyDistance(stats.average_distance),
  average_moving_time: prettifyDuration(stats.average_moving_time)
})
