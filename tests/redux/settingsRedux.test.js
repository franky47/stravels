import { createStore } from 'redux'
import reducer, { DEFAULT_STATE } from '@stravels/redux/settings'
import { actions } from '@stravels/redux/settings/actions'
import createSelector from '@stravels/redux/settings/selectors'

const selector = createSelector()

test('default state should match exported', () => {
  const store = createStore(reducer)
  const actual = store.getState()
  const expected = DEFAULT_STATE
  expect(actual).toEqual(expected)
})
test('default selectors', () => {
  const store = createStore(reducer)
  const state = store.getState()
  expect(selector.getUnits(state)).toEqual('metric')
  expect(selector.showRides(state)).toEqual(true)
  expect(selector.showHikes(state)).toEqual(true)
  expect(selector.showRuns(state)).toEqual(true)
  expect(selector.showCommutes(state)).toEqual(true)
  expect(selector.showPrivate(state)).toEqual(true)
})

describe('Settings', () => {
  test('units', () => {
    const store = createStore(reducer)
    store.dispatch(actions.setUnits('imperial'))
    const actual = selector.getUnits(store.getState())
    const expected = 'imperial'
    expect(actual).toEqual(expected)
  })
  describe('Activity Filter', () => {
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
    test('show commutes', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showCommutes('foo'))
      const actual = selector.showCommutes(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
    test('show private activities', () => {
      const store = createStore(reducer)
      store.dispatch(actions.showPrivate('foo'))
      const actual = selector.showPrivate(store.getState())
      const expected = 'foo'
      expect(actual).toEqual(expected)
    })
  })
})
