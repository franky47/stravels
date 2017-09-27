import { createReducer } from 'reduxsauce'
import { types } from './actions'
import differenceBy from 'lodash/differenceBy'

export const DEFAULT_STATE = {
  data: []
}

const set = (state, { id, payload }) => {
  const entry = { id, ...payload }
  const index = state.data.findIndex((x) => x.id === id)
  if (index > -1) {
    return {
      ...state,
      data: [
        ...state.data.slice(0, index),
        {
          ...state.data[index],
          ...entry
        },
        ...state.data.slice(index + 1)
      ]
    }
  } else {
    return {
      ...state,
      data: [...state.data, entry]
    }
  }
}

const _delete = (state, { id }) => ({
  ...state,
  data: differenceBy(state.data, [{ id }], 'id')
})

export default createReducer(DEFAULT_STATE, {
  [types.SET]: set,
  [types.DELETE]: _delete
})
