export const create = (getRoot = (state) => state) => {
  const paths = {
    oauth: (state) => getRoot(state).oauth,
    user: (state) => getRoot(state).user,
    activities: (state) => getRoot(state).activities,
    friends: (state) => getRoot(state).friends
  }

  // Pure accessors
  const selector = {
    // OAuth
    getOAuthPhase: (state) => paths.oauth(state).phase,
    isOAuthFetching: (state) => paths.oauth(state).fetching,
    getOAuthToken: (state) => paths.oauth(state).getOAuthToken,
    getOAuthError: (state) => paths.oauth(state).error,

    // User
    getUserId: (state) => paths.user(state).id,
    getUserName: (state) => {
      const first = paths.user(state).firstname
      const last = paths.user(state).lastname
      return `${first} ${last}`
    },
    getUserProfilePicture: (state) => paths.user(state).profile,

    // Activities
    getActivitiesPage: (state) => paths.activities(state).page,
    isActivitiesFetching: (state) => paths.activities(state).fetching,
    getActivitiesError: (state) => paths.activities(state).error,
    getActivities: (state) => paths.activities(state).data,

    // Friends
    getFriendsPage: (state) => paths.friends(state).page,
    isFriendsFetching: (state) => paths.friends(state).fetching,
    getFriendsError: (state) => paths.friends(state).error,
    getFriends: (state) => paths.friends(state).data
  }

  // Computed selectors
  selector.isLoggedIn = (state) => selector.getOAuthToken(state) && selector.getUserId(state)
  selector.getActivity = (state, id) => selector.getActivities(state)[id]
  selector.getFriend = (state, id) => selector.getFriends(state)[id]

  return selector
}
