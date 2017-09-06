import AppNavigation from '@stravels/navigation/appNavigation'

export default (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
