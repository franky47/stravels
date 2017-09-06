import { createActions } from 'reduxsauce'

const config = {
  set: ['user']
}

const { Types, Creators } = createActions(config, {
  prefix: 'Strava/User'
})

export {
  Types as types,
  Creators as actions
}
