import EventEmitter from '../../App/Utility/EventEmitter'

describe('Listener Management', () => {
  test('addListener', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe = emitter.addListener(listener)
    expect(unsubscribe).toBeInstanceOf(Function)
    expect(emitter.listeners.size).toEqual(1)
  })
  test('removeListener', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe = emitter.addListener(listener)
    unsubscribe()
    expect(emitter.listeners.size).toEqual(0)
  })
  test('add duplicate listener', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe1 = emitter.addListener(listener)
    const unsubscribe2 = emitter.addListener(listener)
    expect(unsubscribe1).toBeInstanceOf(Function)
    expect(unsubscribe2).toBeInstanceOf(Function)
    expect(emitter.listeners.size).toEqual(1)
  })
  test('remove duplicate listener, unsub 1', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe1 = emitter.addListener(listener)
    const unsubscribe2 = emitter.addListener(listener)
    unsubscribe1()
    expect(emitter.listeners.size).toEqual(0)
  })
  test('remove duplicate listener, unsub 2', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe1 = emitter.addListener(listener)
    const unsubscribe2 = emitter.addListener(listener)
    unsubscribe2()
    expect(emitter.listeners.size).toEqual(0)
  })
  test('remove duplicate listener, unsub both', () => {
    const emitter = new EventEmitter()
    const listener = () => {}
    const unsubscribe1 = emitter.addListener(listener)
    const unsubscribe2 = emitter.addListener(listener)
    unsubscribe1()
    unsubscribe2()
    expect(emitter.listeners.size).toEqual(0)
  })
})

describe('Notifications (sync)', () => {
  test('notifySync, no args', () => {
    const emitter = new EventEmitter()
    const foo = jest.fn()
    const bar = jest.fn()
    emitter.addListeners([foo, bar])
    expect(emitter.listeners.size).toEqual(2)
    emitter.notifyListenersSync()
    expect(foo).toHaveBeenCalledWith()
    expect(bar).toHaveBeenCalledWith()
    // Removed listeners should not be called again
    foo.mockReset()
    bar.mockReset()
    emitter.removeAllListeners()
    emitter.notifyListenersSync()
    expect(foo).not.toHaveBeenCalledWith()
    expect(bar).not.toHaveBeenCalledWith()
  })
  test('notifySync, 1 arg', () => {
    const emitter = new EventEmitter()
    const foo = jest.fn()
    const bar = jest.fn()
    emitter.addListeners([foo, bar])
    emitter.notifyListenersSync('hello')
    expect(foo).toHaveBeenCalledWith('hello')
    expect(bar).toHaveBeenCalledWith('hello')
  })
  test('notifySync, 2 arg', () => {
    const emitter = new EventEmitter()
    const foo = jest.fn()
    const bar = jest.fn()
    emitter.addListeners([foo, bar])
    emitter.notifyListenersSync('hello', { world: '!' })
    expect(foo).toHaveBeenCalledWith('hello', { world: '!' })
    expect(bar).toHaveBeenCalledWith('hello', { world: '!' })
  })
})

describe('Notifications (async)', () => {
  test('notifyAsync, no args', async () => {
    const emitter = new EventEmitter()
    const foo = jest.fn().mockImplementation((...args) => 'foo')
    const bar = jest.fn().mockImplementation((...args) => 'bar')
    emitter.addListeners([foo, bar])

    const promise = await emitter.notifyListeners()
    expect(promise).toEqual(['foo', 'bar'])
    expect(foo).toHaveBeenCalledWith()
    expect(bar).toHaveBeenCalledWith()
  })
  test('notifySync, 1 arg', async () => {
    const emitter = new EventEmitter()
    const foo = jest.fn().mockImplementation((...args) => 'foo')
    const bar = jest.fn().mockImplementation((...args) => 'bar')
    emitter.addListeners([foo, bar])

    const promise = await emitter.notifyListeners('hello')
    expect(promise).toEqual(['foo', 'bar'])
    expect(foo).toHaveBeenCalledWith('hello')
    expect(bar).toHaveBeenCalledWith('hello')
  })
  test('notifySync, 2 arg', async () => {
    const emitter = new EventEmitter()
    const foo = jest.fn().mockImplementation((...args) => 'foo')
    const bar = jest.fn().mockImplementation((...args) => 'bar')
    emitter.addListeners([foo, bar])

    const promise = await emitter.notifyListeners('hello', { world: '!' })
    expect(promise).toEqual(['foo', 'bar'])
    expect(foo).toHaveBeenCalledWith('hello', { world: '!' })
    expect(bar).toHaveBeenCalledWith('hello', { world: '!' })
  })
})

describe('Error handling', () => {
  test('Throw sync', () => {
    const emitter = new EventEmitter()
    const foo = jest.fn().mockImplementation((...args) => { throw new Error('foo') })
    const bar = jest.fn().mockImplementation((...args) => { throw new Error('bar') })
    emitter.addListeners([foo, bar])

    expect(emitter.notifyListenersSync.bind(emitter)).toThrow()
    expect(foo).toHaveBeenCalledWith()
    expect(bar).not.toHaveBeenCalled()
  })
  test('Throw async, should return promise and not throw', () => {
    const emitter = new EventEmitter()
    const foo = jest.fn().mockImplementation((...args) => { throw new Error('foo') })
    const bar = jest.fn().mockImplementation((...args) => { throw new Error('bar') })
    emitter.addListeners([foo, bar])
    expect(emitter.notifyListeners.bind(emitter)).not.toThrow()
  })
  test('Throw async, should get error result in Promise.catch', () => {
    const emitter = new EventEmitter()
    const error = new Error('oops')
    const foo = jest.fn().mockImplementation((...args) => 'foo')
    const bar = jest.fn().mockImplementation((...args) => { throw error })
    emitter.addListeners([foo, bar])
    return emitter.notifyListeners()
      .then(() => {
        expect(false).toBe(true) // should not succeed
      })
      .catch((err) => {
        expect(err).toEqual(error)
      })
  })
})

