import moment from 'moment'
import { arrayToObject } from './convertShape'

export const stateToMonthlySections = (activities = {}) => {
  const sections = []
  for (const activity of Object.values(activities)) {
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

export const apiToState = (activities = []) => arrayToObject(activities, 'id')
