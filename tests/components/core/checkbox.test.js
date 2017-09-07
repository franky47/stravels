import 'react-native'
import React from 'react'
import Checkbox from '@stravels/components/core/checkbox'
// import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

describe('Check / Uncheck', () => {
  test('unchecked', () => {
    const tree = renderer.create(<Checkbox />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('checked', () => {
    const tree = renderer.create(<Checkbox checked />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Custom Colors', () => {
  test('enabled - unchecked', () => {
    const tree = renderer.create(<Checkbox colorOff='#f00' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('enabled - checked', () => {
    const tree = renderer.create(<Checkbox colorOn='#f00' checked />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('disabled - unchecked', () => {
    const tree = renderer.create(<Checkbox colorDisabledOff='#f00' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('disabled - checked', () => {
    const tree = renderer.create(<Checkbox colorDisabledOn='#f00' checked />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Size support', () => {
  test('unchecked', () => {
    const tree = renderer.create(<Checkbox size={42} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('checked', () => {
    const tree = renderer.create(<Checkbox size={42} checked />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

// describe('onPress', () => {
//   test('should not work if disabled', () => {
//     const mock = jest.fn()
//     const checkbox = shallow(<Checkbox onPress={mock} disabled />)
//     expect(checkbox.prop('onPress')).toEqual(mock)
//     expect(mock).not.toHaveBeenCalled()
//     checkbox.simulate('press')
//     expect(mock).not.toHaveBeenCalled()
//   })
//   test('should work if enabled', () => {
//     const mock = jest.fn()
//     const checkbox = shallow(<Checkbox onPress={mock} />)
//     expect(checkbox.prop('onPress')).toEqual(mock)
//     expect(mock).not.toHaveBeenCalled()
//     checkbox.simulate('press')
//     expect(mock).toHaveBeenCalled()
//   })
// })
