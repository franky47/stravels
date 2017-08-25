import { takeLatest } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import {
  watchAuthorizationSuccess,
  watchTokenExchangeRequest,
  watchLogin,
  watchLogout
} from './StravaSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    watchAuthorizationSuccess(),
    watchTokenExchangeRequest(),
    watchLogin(),
    watchLogout()
  ]
}
