import { createStore } from 'redux'
import { rsf } from '@stravels/utility/reduxHelpers'

describe('RSF Helper', () => {
  test('returns an object', () => {
    const foo = rsf('foo')
    expect(foo).toBeInstanceOf(Object)
    expect(foo.actionTypes).toBeInstanceOf(Object)
    expect(foo.actionCreators).toBeInstanceOf(Object)
    expect(foo.reducer).toBeInstanceOf(Function)
  })

  describe('Action Types', () => {
    test('names and keys are uppercase', () => {
      const foo = rsf('foo')
      expect(foo.actionTypes.FOO_REQUEST).toEqual('FOO_REQUEST')
      expect(foo.actionTypes.FOO_SUCCESS).toEqual('FOO_SUCCESS')
      expect(foo.actionTypes.FOO_FAILURE).toEqual('FOO_FAILURE')
    })
  })

  describe('Action Creators', () => {
    test('keys are request, success & failure', () => {
      const foo = rsf('foo')
      expect(Object.keys(foo.actionCreators)).toEqual([
        'request', 'success', 'failure'
      ])
    })
    test('values are functions', () => {
      const foo = rsf('foo')
      expect(foo.actionCreators.request).toBeInstanceOf(Function)
      expect(foo.actionCreators.success).toBeInstanceOf(Function)
      expect(foo.actionCreators.failure).toBeInstanceOf(Function)
    })
    test('return the correct action types', () => {
      const foo = rsf('foo')
      expect(foo.actionCreators.request()).toEqual({ type: 'FOO_REQUEST' })
      expect(foo.actionCreators.success()).toEqual({ type: 'FOO_SUCCESS' })
      expect(foo.actionCreators.failure()).toEqual({ type: 'FOO_FAILURE' })
    })
    test('allow inclusion of extra stuff', () => {
      const foo = rsf('foo')
      expect(foo.actionCreators.request({ hello: 'world' })).toEqual({
        type: 'FOO_REQUEST',
        hello: 'world'
      })
      expect(foo.actionCreators.success({ hello: 'world' })).toEqual({
        type: 'FOO_SUCCESS',
        hello: 'world'
      })
      expect(foo.actionCreators.failure('boo', { hello: 'world' })).toEqual({
        type: 'FOO_FAILURE',
        error: 'boo',
        hello: 'world'
      })
    })
  })
  describe('Reducer', () => {
    test('default reducers do not transform state', () => {
      const foo = rsf('foo')
      const store = createStore(foo.reducer)
      const prevState = store.getState()

      store.dispatch(foo.actionCreators.request())
      let newState = store.getState()
      expect(newState).toEqual(prevState)

      store.dispatch(foo.actionCreators.success())
      newState = store.getState()
      expect(newState).toEqual(prevState)

      store.dispatch(foo.actionCreators.failure())
      newState = store.getState()
      expect(newState).toEqual(prevState)
    })
    test('correct reducer is called', () => {
      const mockReducer = (state, action) => state
      const reducers = {
        request: jest.fn().mockImplementation(mockReducer),
        success: jest.fn().mockImplementation(mockReducer),
        failure: jest.fn().mockImplementation(mockReducer)
      }
      const foo = rsf('foo', reducers)
      const store = createStore(foo.reducer)

      const clearReducersMocks = () => {
        reducers.request.mockClear()
        reducers.success.mockClear()
        reducers.failure.mockClear()
      }

      clearReducersMocks()
      store.dispatch(foo.actionCreators.request())
      expect(reducers.request).toHaveBeenCalled()
      expect(reducers.success).not.toHaveBeenCalled()
      expect(reducers.failure).not.toHaveBeenCalled()

      clearReducersMocks()
      store.dispatch(foo.actionCreators.success())
      expect(reducers.request).not.toHaveBeenCalled()
      expect(reducers.success).toHaveBeenCalled()
      expect(reducers.failure).not.toHaveBeenCalled()

      clearReducersMocks()
      store.dispatch(foo.actionCreators.failure())
      expect(reducers.request).not.toHaveBeenCalled()
      expect(reducers.success).not.toHaveBeenCalled()
      expect(reducers.failure).toHaveBeenCalled()
    })
  })
})
