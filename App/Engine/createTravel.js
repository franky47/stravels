
export const computeStats = (activities = []) => {
  const reduce = (operation, start, initWithFirst = false) => (keys) => {
    const stats = keys.reduce((obj, key) => Object.assign(obj, {[key]: start}), {})
    for (const key of keys) {
      for (const activity of activities) {
        if (!activity.hasOwnProperty(key)) {
          continue
        }
        if (initWithFirst && stats[key] === start) {
          stats[key] = activity[key]
        } else {
          stats[key] = operation(stats[key], activity[key])
        }
      }
    }
    return stats
  }
  const sum = reduce((acc, value) => acc + value, 0.0)
  const max = reduce((acc, value) => Math.max(acc, value), 0.0)
  const min = reduce((acc, value) => Math.min(acc, value), 0.0, true)
  const avg = reduce((acc, value) => acc + (value / activities.length), 0.0)

  const stats = {
    ...sum([
      'distance', 'total_elevation_gain', 'moving_time', 'kilojoules',
      'achievement_count'
    ]),
    ...max([
      'max_speed',
      'elev_high'
    ]),
    ...min([
      'elev_low'
    ]),
    ...avg([
      'average_watts',
      'average_speed'
    ])
  }

  // todo: merge same-day activities before calculating those..
  const averages = avg(['distance', 'moving_time'])
  stats.average_distance = averages.distance
  stats.average_moving_time = averages.moving_time

  return stats
}

export const computeCarbonScore = (stats) => {
  // Carbon Score is how much CO2 you saved compared to an average diesel car.
  // source: http://calculator.carbonfootprint.com/calculator.aspx?tab=4
  const factor = 0.018 // grams per meter
  return factor * (stats.distance || 0.0)
}
