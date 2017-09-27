import { createActions } from 'reduxsauce'

const config = {
  set: ['id', 'payload'],
  delete: ['id']
}

const { Types, Creators } = createActions(config, {
  prefix: 'Travels/'
})

export {
  Types as types,
  Creators as actions
}
