import { Platform } from 'react-native'

const colors = {
  background: '#ffffff',
  clear: 'rgba(0, 0, 0, 0)',
  transparent: 'rgba(0, 0, 0, 0)',
  facebook: '#3b5998',
  strava: '#fc4C02',

  main: Platform.select({
    android: '#4CAF50', // Material green 500
    ios: '#47cc5e'      // Apple green
  }),
  mainShaded: Platform.select({
    android: '#388E3C', // Material green 700
    ios: '#27AC3E'
  }),
  text: 'black',

  separator: 'rgba(0, 0, 0, 0.1)',
  secondary: 'grey',
  checkboxOff: 'grey',
  checkboxOn: '#47cc5e',

  highlightUnderlay: 'rgba(0, 0, 0, 0.05)'
}

export default colors
