import actions from './actions'

const DEFAULT_STATE = {
  units: 'metric',
  activityFilter: {
    showRides: true,
    showHikes: true,
    showRuns: true,
    showPrivate: true
  }
}

const setUnits = (state, { value }) => ({
  ...state,
  units: value
})
const activityFilter = (state, key, value) => ({
  ...state,
  activityFilter: {
    ...state.activityFilter,
    [key]: value
  }
})

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actions.SetUnits:
      return setUnits(state, action)
    case actions.ShowRides:
      return activityFilter(state, 'showRides', action.value)
    case actions.ShowHikes:
      return activityFilter(state, 'showHikes', action.value)
    case actions.ShowRuns:
      return activityFilter(state, 'showRuns', action.value)
    case actions.ShowPrivateActivities:
      return activityFilter(state, 'showPrivate', action.value)
    default:
      return state
  }
}
