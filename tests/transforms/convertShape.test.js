import { arrayToObject } from '@stravels/transforms/convertShape'

describe('Array to Object', () => {
  test('default args returns empty object', () => {
    const actual = arrayToObject()
    const expected = {}
    expect(actual).toEqual(expected)
  })
  test('default key is id', () => {
    const input = [
      { id: 'foo', name: 'Foo' },
      { id: 'bar', name: 'Bar' }
    ]
    const actual = arrayToObject(input)
    const expected = {
      foo: { id: 'foo', name: 'Foo' },
      bar: { id: 'bar', name: 'Bar' }
    }
    expect(actual).toEqual(expected)
  })
  test('using custom key', () => {
    const input = [
      { uid: 'foo', name: 'Foo' },
      { uid: 'bar', name: 'Bar' }
    ]
    const actual = arrayToObject(input, 'uid')
    const expected = {
      foo: { uid: 'foo', name: 'Foo' },
      bar: { uid: 'bar', name: 'Bar' }
    }
    expect(actual).toEqual(expected)
  })
  test('items without a key are ommitted', () => {
    const input = [
      { name: 'Foo' },
      { name: 'Bar' },
      { id: 'egg', name: 'Egg' },
      { name: 'Spam' }
    ]
    const actual = arrayToObject(input)
    const expected = {
      egg: { id: 'egg', name: 'Egg' }
    }
    expect(actual).toEqual(expected)
  })
})
