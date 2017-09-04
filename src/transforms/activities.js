import moment from 'moment'
import { selectors } from '@stravels/redux'

export const getVisibleActivities = (state) => {
  const allActivities = selectors.strava.getActivities(state)
  const predicate = (activity) => {
    if (activity.private && !selectors.settings.showPrivateActivities(state)) {
      return false
    }
    switch (activity.type) {
      case 'Ride': return selectors.settings.showRides(state)
      case 'Hike': return selectors.settings.showHikes(state)
      case 'Run': return selectors.settings.showRuns(state)
      default:
        return false
    }
  }
  return allActivities.filter(predicate)
}

export const groupByMonth = (activities = []) => {
  const sections = []
  for (const activity of activities) {
    const title = moment(activity.start_date).format('MMMM YYYY')
    const index = sections.findIndex((section) => section.title === title)
    if (index === -1) {
      sections.unshift({
        title,
        data: [activity]
      })
    } else {
      sections[index].data.unshift(activity)
    }
  }
  return sections
}
