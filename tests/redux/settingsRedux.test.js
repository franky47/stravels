import { createStore } from 'redux'
import { reducer } from '@stravels/redux/settings'
import * as actions from '@stravels/redux/settings/actions'
import { create as createSelector } from '@stravels/redux/settings/selectors'

const selector = createSelector()

test('default state', () => {
  const store = createStore(reducer)
  const actual = store.getState()
  const expected = {
    units: 'metric',
    activityFilter: {
      showRides: true,
      showHikes: true,
      showRuns: true,
      showPrivate: true
    }
  }
  expect(actual).toEqual(expected)
})
test('default selectors', () => {
  const store = createStore(reducer)
  const state = store.getState()
  expect(selector.getUnits(state)).toEqual('metric')
  expect(selector.getActivityFilter(state)).toEqual({
    showRides: true,
    showHikes: true,
    showRuns: true,
    showPrivate: true
  })
  expect(selector.showRides(state)).toEqual(true)
  expect(selector.showHikes(state)).toEqual(true)
  expect(selector.showRuns(state)).toEqual(true)
  expect(selector.showPrivateActivities(state)).toEqual(true)
})

describe('Settings', () => {
  test('units', () => {
    const store = createStore(reducer)
    store.dispatch(actions.setUnits('imperial'))
    const actual = selector.getUnits(store.getState())
    const expected = 'imperial'
    expect(actual).toEqual(expected)
  })
  describe('activity filter', () => {
    test('show rides', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showRides('foo'))
      const actual = selector.showRides(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
    test('show hikes', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showHikes('foo'))
      const actual = selector.showHikes(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
    test('show runs', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showRuns('foo'))
      const actual = selector.showRuns(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
    test('show private activities', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showPrivateActivities('foo'))
      const actual = selector.showPrivateActivities(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
  })
})
