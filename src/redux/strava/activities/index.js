import { createReducer } from 'reduxsauce'
import { types } from './actions'

export const DEFAULT_STATE = {
  data: [],
  fetching: false,
  error: null,
  eof: false
}

// Requests
const request = (state, action) => ({
  ...state,
  fetching: true
})

// Responses
const success = (state, { data, insertAt }) => {
  if (insertAt === 'tail') {
    return {
      ...state,
      data: [...state.data, ...data],
      fetching: false,
      error: null
    }
  } else if (insertAt === 'head') {
    return {
      ...state,
      data: [...data, ...state.data],
      fetching: false,
      error: null
    }
  }
  return state
}

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error
})

const setEof = (state, action) => ({
  ...state,
  eof: true
})

const clear = (state, action) => ({
  ...state,
  data: [],
  eof: false
})

export default createReducer(DEFAULT_STATE, {
  // Requests
  [types.REQUEST_HEAD]: request,
  [types.REQUEST_TAIL]: request,

  // Responses
  [types.SUCCESS]: success,
  [types.FAILURE]: failure,

  [types.SET_EOF]: setEof,
  [types.CLEAR]: clear
})
