import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import reduxPersist from '../config/reduxPersist'
import startupActions from '../redux/startupRedux'
import devConfig from '../config/development'

const wipeAsyncStorage = () => {
  return AsyncStorage.clear()
}

const updateReducers = (store: Object) => {
  const reducerVersion = reduxPersist.reducerVersion
  const config = reduxPersist.storeConfig
  const startup = () => store.dispatch(startupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      if (devConfig.useReactotron) {
        console.tron.display({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion
          },
          preview: 'Reducer Version Change Detected',
          important: true
        })
      }
      // Purge store
      persistStore(store, config, startup).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config, startup)
    }
  }).catch(() => {
    persistStore(store, config, startup)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default {
  updateReducers,
  wipeAsyncStorage
}