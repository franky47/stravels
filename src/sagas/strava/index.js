import { all } from 'redux-saga/effects'
import oauthSaga from './oauthSagas'
import activitiesSaga from './activitiesSagas'
import friendsSaga from './friendsSagas'

import api from '@stravels/services/stravaApi'

export default function * () {
  yield all([
    oauthSaga(api),
    activitiesSaga(api),
    friendsSaga(api)
  ])
}
