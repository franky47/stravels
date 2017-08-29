import stravaActions from '../Redux/strava/actions'
import { NavigationActions } from 'react-navigation'
import { takeEvery, put } from 'redux-saga/effects'

export const resetNavigationTo = (routeName) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName })
  ]
})

export function * resetToMainScreen () {
  yield put(resetNavigationTo('MainScreen'))
}
export function * resetToLoginScreen () {
  yield put(resetNavigationTo('LoginScreen'))
}

export default function * () {
  yield takeEvery(stravaActions.Login, resetToMainScreen)
  yield takeEvery(stravaActions.LogoutSuccess, resetToLoginScreen)
}
