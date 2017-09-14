import { createReducer } from 'reduxsauce'
import { types } from './actions'

export const DEFAULT_STATE = {
  units: 'metric',
  activityFilter: {
    showRides: true,
    showHikes: true,
    showRuns: true,
    showCommutes: true,
    showPrivate: true
  }
}

const setUnits = (state, { value }) => ({
  ...state,
  units: value
})

const activityFilter = (key) => (state, { value }) => ({
  ...state,
  activityFilter: {
    ...state.activityFilter,
    [key]: value
  }
})

const showRides = activityFilter('showRides')
const showHikes = activityFilter('showHikes')
const showRuns = activityFilter('showRuns')
const showCommutes = activityFilter('showCommutes')
const showPrivate = activityFilter('showPrivate')

export default createReducer(DEFAULT_STATE, {
  [types.SET_UNITS]: setUnits,
  [types.SHOW_RIDES]: showRides,
  [types.SHOW_HIKES]: showHikes,
  [types.SHOW_RUNS]: showRuns,
  [types.SHOW_COMMUTES]: showCommutes,
  [types.SHOW_PRIVATE]: showPrivate
})
