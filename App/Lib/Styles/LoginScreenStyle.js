import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingHorizontal: 10,
    paddingTop: 40
  },
  socialLoginsContainer: {
    height: 100,
    flex: 1,
    justifyContent: 'center'
  }
})
