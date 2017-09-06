import { createActions } from 'reduxsauce'

const prefix = 'Strava/Activities/'

const config = {
  // Requests
  requestHead: null,
  requestTail: null,

  // Responses
  success: (data = [], insertAt = 'tail') => ({
    type: `${prefix}SUCCESS`,
    data,
    insertAt
  }),
  failure: ['error'],

  // End of File
  setEof: null,

  clear: null
}

const { Types, Creators } = createActions(config, { prefix })

export {
  Types as types,
  Creators as actions
}
