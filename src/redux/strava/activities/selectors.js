import { getOldestUnixDate, getNewestUnixDate } from '@stravels/transforms/activities'

export const getActivities = (state) => state.data
export const isFetching = (state) => state.fetching
export const isEof = (state) => state.eof
export const getError = (state) => state.error

export default (stateMapper = (s) => s) => ({
  // Pure Accessors
  getActivities: (parentState) => getActivities(stateMapper(parentState)),
  isFetching: (parentState) => isFetching(stateMapper(parentState)),
  isEof: (parentState) => isEof(stateMapper(parentState)),
  getError: (parentState) => getError(stateMapper(parentState)),

  // Computed
  getOldestUnixDate: (parentState) => {
    const activities = getActivities(stateMapper(parentState))
    return getOldestUnixDate(activities)
  },
  getNewestUnixDate: (parentState) => {
    const activities = getActivities(stateMapper(parentState))
    return getNewestUnixDate(activities)
  }
})
