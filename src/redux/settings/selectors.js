export const create = (getRoot = (state) => state) => {
  const selector = {
    getUnits: (state) => getRoot(state).units,
    getActivityFilter: (state) => getRoot(state).activityFilter,
    showRides: (state) => getRoot(state).activityFilter.showRides,
    showHikes: (state) => getRoot(state).activityFilter.showHikes,
    showRuns: (state) => getRoot(state).activityFilter.showRuns,
    showPrivateActivities: (state) => getRoot(state).activityFilter.showPrivate
  }

  // Computed selectors
  return selector
}
