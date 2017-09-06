import { createStore } from 'redux'
import reducer, { DEFAULT_STATE } from '@stravels/redux/strava/activities'
import { types, actions } from '@stravels/redux/strava/activities/actions'
import createSelector from '@stravels/redux/strava/activities/selectors'

const select = createSelector()

// Mock activities
const foo = { id: 4, name: 'foo', start_date: '2017-01-04T00:00:00Z' }
const bar = { id: 3, name: 'bar', start_date: '2017-01-03T00:00:00Z' }
const egg = { id: 2, name: 'egg', start_date: '2017-01-02T00:00:00Z' }
const spam = { id: 1, name: 'spam', start_date: '2017-01-01T00:00:00Z' }

describe('Default State', () => {
  test('should match the exported value', () => {
    const store = createStore(reducer)
    const actual = store.getState()
    const expected = DEFAULT_STATE
    expect(actual).toEqual(expected)
  })
})

describe('Requests', () => {
  describe('Head', () => {
    test('action creator', () => {
      const actual = actions.requestHead()
      const expected = { type: types.REQUEST_HEAD }
      expect(actual).toEqual(expected)
    })
    test('should set the fetching flag', () => {
      const store = createStore(reducer)
      store.dispatch(actions.requestHead())
      const actual = select.isFetching(store.getState())
      const expected = true
      expect(actual).toEqual(expected)
    })
  })
  describe('Tail', () => {
    test('action creator', () => {
      const actual = actions.requestTail()
      const expected = { type: types.REQUEST_TAIL }
      expect(actual).toEqual(expected)
    })
    test('should set the fetching flag', () => {
      const store = createStore(reducer)
      store.dispatch(actions.requestTail())
      const actual = select.isFetching(store.getState())
      const expected = true
      expect(actual).toEqual(expected)
    })
  })
})

describe('Responses', () => {
  describe('Action Creators', () => {
    test('default success action body', () => {
      const actual = actions.success()
      const expected = {
        type: types.SUCCESS,
        data: [],
        insertAt: 'tail'
      }
      expect(actual).toEqual(expected)
    })
    test('first argument to success should be payload', () => {
      const action = actions.success(['foo', 'bar'])
      const actual = action.data
      const expected = ['foo', 'bar']
      expect(actual).toEqual(expected)
    })
    test('second argument to success should be insertAt', () => {
      const action = actions.success(['foo', 'bar'], 'head')
      const actual = action.insertAt
      const expected = 'head'
      expect(actual).toEqual(expected)
    })
    test(`default insertAt should be 'tail'`, () => {
      const action = actions.success(['foo', 'bar'])
      const actual = action.insertAt
      const expected = 'tail'
      expect(actual).toEqual(expected)
    })
  })
  describe('Success', () => {
    test('should clear the fetching flag', () => {
      const store = createStore(reducer)
      store.dispatch(actions.requestHead())
      store.dispatch(actions.success())
      const actual = select.isFetching(store.getState())
      const expected = false
      expect(actual).toEqual(expected)
    })
    test('tail should append data', () => {
      const store = createStore(reducer)
      store.dispatch(actions.success([foo, bar], 'tail'))
      store.dispatch(actions.success([egg, spam], 'tail'))
      const actual = select.getActivities(store.getState())
      const expected = [foo, bar, egg, spam]
      expect(actual).toEqual(expected)
    })
    test('intersecting tail should update common data', () => {
      const baz = { ...bar, name: 'baz' }
      const store = createStore(reducer)
      store.dispatch(actions.success([foo, bar, egg], 'tail'))
      store.dispatch(actions.success([egg, baz, spam], 'tail'))
      const actual = select.getActivities(store.getState())
      const expected = [foo, baz, egg, spam]
      expect(actual).toEqual(expected)
    })
    test('head should prepend data', () => {
      const store = createStore(reducer)
      store.dispatch(actions.success([foo, bar], 'head'))
      store.dispatch(actions.success([egg, spam], 'head'))
      const actual = select.getActivities(store.getState())
      const expected = [egg, spam, foo, bar]
      expect(actual).toEqual(expected)
    })
    test('intersecting head should update common data', () => {
      const store = createStore(reducer)
      const gee = { ...egg, name: 'gee' }
      store.dispatch(actions.success([egg, spam], 'head'))
      store.dispatch(actions.success([foo, bar, gee], 'head'))
      const actual = select.getActivities(store.getState())
      const expected = [foo, bar, gee, spam]
      expect(actual).toEqual(expected)
    })
    test('empty tail data should not set eof', () => {
      const store = createStore(reducer)
      store.dispatch(actions.success([], 'tail'))
      const actual = select.isEof(store.getState())
      const expected = false
      expect(actual).toEqual(expected)
    })
  })
  describe('Failure', () => {
    test('should store the error', () => {
      const error = new Error('boo')
      const store = createStore(reducer)
      store.dispatch(actions.failure(error))
      const actual = select.getError(store.getState())
      const expected = error
      expect(actual).toEqual(expected)
    })
    test('Next request should not clear the error flag', () => {
      const error = new Error('boo')
      const store = createStore(reducer)
      store.dispatch(actions.failure(error))
      store.dispatch(actions.requestHead())
      const actual = select.getError(store.getState())
      const expected = error
      expect(actual).toEqual(expected)
    })
    test('Next success should clear the error flag', () => {
      const error = new Error('boo')
      const store = createStore(reducer)
      store.dispatch(actions.failure(error))
      store.dispatch(actions.success())
      const actual = select.getError(store.getState())
      const expected = null
      expect(actual).toEqual(expected)
    })
  })
  describe('EoF', () => {

  })
})

describe('EoF', () => {
  test('should set the eof flag', () => {
    const store = createStore(reducer)
    store.dispatch(actions.setEof())
    const actual = select.isEof(store.getState())
    const expected = true
    expect(actual).toEqual(expected)
  })
})

describe('Clear', () => {
  test('should wipe the activities list', () => {
    const store = createStore(reducer)
    store.dispatch(actions.success(['foo', 'bar', 'egg', 'spam']))
    store.dispatch(actions.clear())
    const actual = select.getActivities(store.getState())
    const expected = []
    expect(actual).toEqual(expected)
  })
  test('should clear the EoF flag', () => {
    const store = createStore(reducer)
    store.dispatch(actions.setEof())
    store.dispatch(actions.clear())
    const actual = select.isEof(store.getState())
    const expected = false
    expect(actual).toEqual(expected)
  })
})
