export const getUnits = (state) => state.units
export const showRides = (state) => state.activityFilter.showRides
export const showHikes = (state) => state.activityFilter.showHikes
export const showRuns = (state) => state.activityFilter.showRuns
export const showPrivate = (state) => state.activityFilter.showPrivate

export default (stateMapper = (s) => s) => ({
  getUnits: (parentState) => getUnits(stateMapper(parentState)),
  showRides: (parentState) => showRides(stateMapper(parentState)),
  showHikes: (parentState) => showHikes(stateMapper(parentState)),
  showRuns: (parentState) => showRuns(stateMapper(parentState)),
  showPrivate: (parentState) => showPrivate(stateMapper(parentState))
})
