import { createActions } from 'reduxsauce'

const config = {
  setUnits: ['value'],

  // Activity Filter
  showRides: ['value'],
  showHikes: ['value'],
  showRuns: ['value'],
  showCommutes: ['value'],
  showPrivate: ['value']
}

const { Types, Creators } = createActions(config, {
  prefix: 'Settings/'
})

export {
  Types as types,
  Creators as actions
}
