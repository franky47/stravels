import { put, call, select, throttle } from 'redux-saga/effects'
import { types, actions } from '@stravels/redux/strava/activities/actions'
import * as sagas from '@stravels/sagas/strava/activitiesSagas'
import selectors from '@stravels/redux/selectors'

const api = {
  getActivities: () => {}
}

// Mock activities
const foo = { id: 4, name: 'foo', start_date: '2017-01-04T00:00:00Z' }
const bar = { id: 3, name: 'bar', start_date: '2017-01-03T00:00:00Z' }
const egg = { id: 2, name: 'egg', start_date: '2017-01-02T00:00:00Z' }
const spam = { id: 1, name: 'spam', start_date: '2017-01-01T00:00:00Z' }

describe('Request Head', () => {
  test('no activities anywhere', () => {
    const saga = sagas.requestHeadSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [] }).value).toEqual(put(actions.success([], 'head')))
    expect(saga.next().done).toEqual(true)
  })
  test('empty state, received activities', () => {
    const saga = sagas.requestHeadSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [foo, bar] }).value).toEqual(put(actions.success([foo, bar], 'head')))
    expect(saga.next().done).toEqual(true)
  })
  test('head intersects with state', () => {
    const saga = sagas.requestHeadSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([bar, egg]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [foo, bar] }).value).toEqual(put(actions.success([foo, bar], 'head')))
    expect(saga.next().done).toEqual(true)
  })
  test('head does not intersect with state, multiple calls', () => {
    const saga = sagas.requestHeadSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([egg, spam]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [foo] }).value).toEqual(call([api, api.getActivities], { before: Date.parse(foo.start_date) }))
    expect(saga.next({ data: [bar] }).value).toEqual(call([api, api.getActivities], { before: Date.parse(bar.start_date) }))
    expect(saga.next({ data: [egg] }).value).toEqual(put(actions.success([foo, bar, egg], 'head')))
    expect(saga.next().done).toEqual(true)
  })
})

describe('Request Tail', () => {
  test('no activities anywhere', () => {
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [] }).value).toEqual(put(actions.setEof()))
    expect(saga.next().value).toEqual(put(actions.success([], 'head')))
    expect(saga.next().done).toEqual(true)
  })
  test('empty state should actually request the head', () => {
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([]).value).toEqual(call([api, api.getActivities], {}))
    expect(saga.next({ data: [foo, bar] }).value).toEqual(put(actions.success([foo, bar], 'head')))
    expect(saga.next().done).toEqual(true)
  })
  test('request after oldest element in state', () => {
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([foo, bar]).value).toEqual(call([api, api.getActivities], { before: Date.parse(bar.start_date) }))
    expect(saga.next({ data: [egg, spam] }).value).toEqual(put(actions.success([egg, spam], 'tail')))
    expect(saga.next().done).toEqual(true)
  })
  test('receive empty data results in setEof', () => {
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([foo, bar]).value).toEqual(call([api, api.getActivities], { before: Date.parse(bar.start_date) }))
    expect(saga.next({ data: [] }).value).toEqual(put(actions.setEof()))
    expect(saga.next().value).toEqual(put(actions.success([], 'tail')))
    expect(saga.next().done).toEqual(true)
  })
  test('failure in selector', () => {
    const error = new Error('boo')
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.throw(error).value).toEqual(put(actions.failure(error)))
    expect(saga.next().done).toEqual(true)
  })
  test('failure in api call', () => {
    const error = new Error('boo')
    const saga = sagas.requestTailSaga(api)
    expect(saga.next().value).toEqual(select(selectors.strava.activities.getActivities))
    expect(saga.next([foo, bar]).value).toEqual(call([api, api.getActivities], { before: Date.parse(bar.start_date) }))
    expect(saga.throw(error).value).toEqual(put(actions.failure(error)))
    expect(saga.next().done).toEqual(true)
  })
})

describe('Watchers', () => {
  describe('Tail Switch', () => {
    test('should call the saga when the EoF flag is cleared', () => {
      const saga = sagas.tailSwitch(api)
      expect(saga.next().value).toEqual(select(selectors.strava.activities.isEof))
      expect(saga.next(false).value).toEqual(call(sagas.requestTailSaga, api))
      expect(saga.next().done).toEqual(true)
    })
    test('should return when the EoF flag is set', () => {
      const saga = sagas.tailSwitch(api)
      expect(saga.next().value).toEqual(select(selectors.strava.activities.isEof))
      expect(saga.next(true).done).toEqual(true)
    })
  })
  test('Request Head Watcher', () => {
    const saga = sagas.watchRequestHead(api)
    expect(saga.next().value).toEqual(call(throttle, 1000, types.REQUEST_HEAD, sagas.requestHeadSaga, api))
    expect(saga.next().done).toEqual(true)
  })
  test('Request Tail Watcher', () => {
    const saga = sagas.watchRequestTail(api)
    expect(saga.next().value).toEqual(call(throttle, 1000, types.REQUEST_TAIL, sagas.tailSwitch, api))
    expect(saga.next().done).toEqual(true)
  })
})
