import strava from './strava/selectors'
import settings from './settings/selectors'

export default {
  strava: strava((state) => state.strava),
  settings: settings((state) => state.settings)
}
