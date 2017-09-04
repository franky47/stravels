import 'react-native'
import React from 'react'
import StatItem from '@stravels/components/stats/item'
// import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

test('component renders correctly', () => {
  const tree = renderer.create(<StatItem label='foo' value={42} unit='bar' />).toJSON()
  expect(tree).toMatchSnapshot()
})

// test('onPress', () => {
//   let i = 0 // i guess i could have used sinon here too... less is more i guess
//   const onPress = () => i++
//   const wrapperPress = shallow(<FullButton onPress={onPress} text='hi' />)

//   expect(wrapperPress.prop('onPress')).toBe(onPress) // uses the right handler
//   expect(i).toBe(0)
//   wrapperPress.simulate('press')
//   expect(i).toBe(1)
// })
