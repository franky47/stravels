import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import config from '@stravels/config/development'
import rehydration from '@stravels/services/rehydration'
import reduxPersist from '@stravels/config/reduxPersist'
import screenTracking from './middlewares/screenTracking'

export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Analytics
  middleware.push(screenTracking)

  // Sagas
  const sagaMonitor = config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  // Assemble middlewares
  enhancers.push(applyMiddleware(...middleware))

  // Rehydration
  if (reduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // If Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // Configure persistStore and check reducer version number
  if (reduxPersist.active) {
    rehydration.updateReducers(store)
  }

  // Start root saga
  sagaMiddleware.run(rootSaga)

  return store
}
