// Action Types
const actions = {
  SetUnits: 'Settings/SET_UNITS',

  // Activity Filter
  ShowRides: 'Settings/SHOW_RIDES',
  ShowHikes: 'Settings/SHOW_HIKES',
  ShowRuns: 'Settings/SHOW_RUNS',

  ShowPrivateActivities: 'Settings/SHOW_PRIVATE_ACTIVITIES'
}
export default actions

// Action Creators

export const setUnits = (value) => ({
  type: actions.SetUnits,
  value
})
export const showRides = (value) => ({
  type: actions.ShowRides,
  value
})
export const showHikes = (value) => ({
  type: actions.ShowHikes,
  value
})
export const showRuns = (value) => ({
  type: actions.ShowRuns,
  value
})
export const showPrivateActivities = (value) => ({
  type: actions.ShowPrivateActivities,
  value
})
