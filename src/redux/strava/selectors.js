import oauth from './oauth/selectors'
import user from './user/selectors'
import activities from './activities/selectors'

export default (stateMapper = (s) => s) => ({
  oauth: oauth((state) => stateMapper(state).oauth),
  user: user((state) => stateMapper(state).user),
  activities: activities((state) => stateMapper(state).activities)
})
