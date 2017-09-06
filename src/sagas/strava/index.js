import oauthSaga from './oauthSagas'
import activitiesSaga from './activitiesSagas'
import friendsSaga from './friendsSagas'

import api from '@stravels/services/stravaApi'

export default function * () {
  yield [
    oauthSaga(api),
    activitiesSaga(api),
    friendsSaga(api)
  ]
}
