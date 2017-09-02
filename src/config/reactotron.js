import config from './development'
import Immutable from 'seamless-immutable'
import Reactotron, { openInEditor, asyncStorage } from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import apisaucePlugin from 'reactotron-apisauce'

if (config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'Stravels' })
    .useReactNative()
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .use(openInEditor())
    .use(asyncStorage())
    .use(apisaucePlugin())
    .connect()

  // Clear Reactotron every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}
