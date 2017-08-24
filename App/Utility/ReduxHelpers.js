import { snakeCase } from 'lodash'

const defaultReducers = {
  request: (state, action) => state,
  success: (state, action) => state,
  failure: (state, action) => state,
}

export const rsf = (actionName, reducers = defaultReducers) => {
  reducers = {...defaultReducers, ...reducers}

  const action = snakeCase(actionName).toUpperCase()
  const actionRequest = `${action}_REQUEST`
  const actionSuccess = `${action}_SUCCESS`
  const actionFailure = `${action}_FAILURE`

  const actionTypes = {
    [actionRequest]: actionRequest,
    [actionSuccess]: actionSuccess,
    [actionFailure]: actionFailure,
  }

  const requestActionCreator = (extra = {}) => ({
    type: actionRequest,
    ...extra
  })
  const successActionCreator = (extra = {}) => ({
    type: actionSuccess,
    ...extra
  })
  const failureActionCreator = (error, extra = {}) => ({
    type: actionFailure,
    error,
    ...extra
  })
  const actionCreators = {
    request: requestActionCreator,
    success: successActionCreator,
    failure: failureActionCreator,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case actionRequest: return reducers.request(state, action)
      case actionSuccess: return reducers.success(state, action)
      case actionFailure: return reducers.failure(state, action)
      default:
        return state
    }
  }

  return {
    actionTypes,
    actionCreators,
    reducer
  }
}

export const rsfReducerBuilder = (phase) => {
  const stripActionType = (action) => {
    const copy = {...action}
    delete copy.type
    return copy
  }

  const request = (state, action) => ({
    ...state,
    fetching: true,
    phase,
    ...stripActionType(action)
  })
  const success = (state, action) => ({
    ...state,
    fetching: false,
    error: null,
    phase,
    ...stripActionType(action)
  })
  const failure = (state, action) => ({
    ...state,
    fetching: false,
    error: action.error,
    phase,
    ...stripActionType(action)
  })

  return {
    request,
    success,
    failure
  }
}
