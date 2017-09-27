export const getTravels = (state) => state.data

export default (stateMapper = (s) => s) => ({
  getTravels: (parentState) => getTravels(stateMapper(parentState))
})
