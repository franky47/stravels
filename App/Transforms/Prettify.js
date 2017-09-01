import moment from 'moment'

export const prettifyDistance = (meters) => {
  if (meters >= 1000.0) {
    return (meters * 0.001).toFixed(2) + 'km'
  } else {
    return meters.toFixed(2) + 'm'
  }
}
export const prettifyElevation = (meters) => {
  return meters.toFixed(0) + 'm'
}
export const prettifyDuration = (seconds) => {
  return moment.duration(seconds, 'seconds').asHours().toFixed(1) + 'h'
}
export const prettifyKilojoules = (kilojoules) => {
  if (kilojoules >= 1000.0) {
    return (kilojoules * 0.001).toFixed(2) + ' MJ'
  } else if (kilojoules < 1.0) {
    return (kilojoules * 1000.0).toFixed(2) + 'J'
  } else {
    return kilojoules.toFixed(2) + 'kJ'
  }
}
export const prettifyWatts = (watts) => {
  if (watts >= 1000.0) {
    return (watts * 0.001).toFixed(2) + 'kW'
  } else {
    return watts.toFixed(2) + 'W'
  }
}
export const prettifyMass = (kilograms) => {
  if (kilograms >= 1000.0) {
    return (kilograms * 0.001).toFixed(2) + ' metric tons'
  } else if (kilograms < 1.0) {
    return (kilograms * 1000.0).toFixed(2) + 'g'
  } else {
    return kilograms.toFixed(2) + 'kg'
  }
}
export const prettifySpeed = (metersPerSecond) => {
  return (metersPerSecond * 3.6).toFixed(2) + 'km/h'
}

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
