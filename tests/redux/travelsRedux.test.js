import { createStore } from 'redux'
import reducer, { DEFAULT_STATE } from '@stravels/redux/travels'
import { actions } from '@stravels/redux/travels/actions'
import createSelector from '@stravels/redux/travels/selectors'

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
  expect(selector.getTravels(state)).toEqual([])
})

describe('Travels', () => {
  describe('Set', () => {
    test('should create non-existing travel', () => {
      const store = createStore(reducer)
      const payload = {
        foo: 'bar',
        egg: 'spam'
      }
      store.dispatch(actions.set('foo', payload))
      expect(selector.getTravels(store.getState())).toEqual([
        {
          id: 'foo',
          ...payload
        }
      ])
    })
    test('should edit existing travel', () => {
      const store = createStore(reducer)
      const payload = {
        foo: 'bar',
        egg: 'spam'
      }
      store.dispatch(actions.set('foo', payload))
      store.dispatch(actions.set('foo', { hello: 'world' }))
      expect(selector.getTravels(store.getState())).toEqual([
        {
          id: 'foo',
          ...payload,
          hello: 'world'
        }
      ])
    })
    test('should be idempotent', () => {
      const store = createStore(reducer)
      const payload = {
        foo: 'bar',
        egg: 'spam'
      }
      store.dispatch(actions.set('foo', payload))
      store.dispatch(actions.set('foo', payload))
      expect(selector.getTravels(store.getState())).toEqual([
        {
          id: 'foo',
          ...payload
        }
      ])
    })
    test('should edit first item', () => {
      const store = createStore(reducer)
      store.dispatch(actions.set('foo', { name: 'Foo' }))
      store.dispatch(actions.set('bar', { name: 'Bar' }))
      store.dispatch(actions.set('egg', { name: 'Egg' }))
      // Edit first item
      store.dispatch(actions.set('foo', { name: 'Mr. Foo' }))

      expect(selector.getTravels(store.getState())).toEqual([
        { id: 'foo', name: 'Mr. Foo' },
        { id: 'bar', name: 'Bar' },
        { id: 'egg', name: 'Egg' }
      ])
    })
    test('should edit last item', () => {
      const store = createStore(reducer)
      store.dispatch(actions.set('foo', { name: 'Foo' }))
      store.dispatch(actions.set('bar', { name: 'Bar' }))
      store.dispatch(actions.set('egg', { name: 'Egg' }))
      // Edit first item
      store.dispatch(actions.set('egg', { name: 'Mr. Egg' }))

      expect(selector.getTravels(store.getState())).toEqual([
        { id: 'foo', name: 'Foo' },
        { id: 'bar', name: 'Bar' },
        { id: 'egg', name: 'Mr. Egg' }
      ])
    })
    test('should edit middle item', () => {
      const store = createStore(reducer)
      store.dispatch(actions.set('foo', { name: 'Foo' }))
      store.dispatch(actions.set('bar', { name: 'Bar' }))
      store.dispatch(actions.set('egg', { name: 'Egg' }))
      // Edit first item
      store.dispatch(actions.set('bar', { name: 'Mr. Bar' }))

      expect(selector.getTravels(store.getState())).toEqual([
        { id: 'foo', name: 'Foo' },
        { id: 'bar', name: 'Mr. Bar' },
        { id: 'egg', name: 'Egg' }
      ])
    })
  })
  describe('Delete', () => {
    test('should not change if not found', () => {
      const store = createStore(reducer)
      const payload = {
        foo: 'bar',
        egg: 'spam'
      }
      store.dispatch(actions.set('foo', payload))
      store.dispatch(actions.delete('bar'))
      expect(selector.getTravels(store.getState())).toEqual([
        {
          id: 'foo',
          ...payload
        }
      ])
    })
    test('should delete if found', () => {
      const store = createStore(reducer)
      const payload = {
        foo: 'bar',
        egg: 'spam'
      }
      store.dispatch(actions.set('foo', payload))
      store.dispatch(actions.delete('foo'))
      expect(selector.getTravels(store.getState())).toEqual([])
    })
  })
})
