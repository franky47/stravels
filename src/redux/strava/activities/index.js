import { createReducer } from 'reduxsauce'
import { differenceBy } from 'lodash'
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

const updateCommon = (stateData, newData) => {
  const data = [...stateData]
  for (const n in newData) {
    for (const s in data) {
      if (newData[n].id === data[s].id) {
        data[s] = newData[n]
      }
    }
  }
  return data
}
const insertNew = (stateData, newData, insertAt) => {
  const data = differenceBy(newData, stateData, 'id')
  if (insertAt === 'head') {
    return [...data, ...stateData]
  } else if (insertAt === 'tail') {
    return [...stateData, ...data]
  }
  return stateData
}

const success = (state, { data, insertAt }) => ({
  ...state,
  data: updateCommon(insertNew(state.data, data, insertAt), data),
  fetching: false,
  error: null
})

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
