import moment from 'moment'

export const filterActivities = (activities = [], filter) => {
  const predicate = (activity) => {
    if (activity.private && !filter.showPrivate) {
      return false
    }
    switch (activity.type) {
      case 'Ride': return filter.showRides
      case 'Hike': return filter.showHikes
      case 'Run': return filter.showRuns
      default:
        return false
    }
  }
  return activities.filter(predicate)
}

export const groupByMonth = (activities = []) => {
  const sections = []
  for (const activity of activities) {
    const title = moment(activity.start_date).format('MMMM YYYY')
    const index = sections.findIndex((section) => section.title === title)
    if (index === -1) {
      sections.push({
        title,
        data: [activity]
      })
    } else {
      sections[index].data.push(activity)
    }
  }
  return sections
}

export const getOldestUnixDate = (activities = []) => {
  if (activities.length === 0) {
    return 0
  }
  return Math.floor(0.001 * activities.reduce((min, activity) => {
    const time = Date.parse(activity.start_date)
    return Math.min(min, time)
  }, Number.MAX_VALUE))
}

export const getNewestUnixDate = (activities = []) => {
  if (activities.length === 0) {
    return Number.MAX_VALUE
  }
  return Math.floor(0.001 * activities.reduce((min, activity) => {
    const time = Date.parse(activity.start_date)
    return Math.max(min, time)
  }, 0))
}
