import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  buttonContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#3eb352'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  emailLinks: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  linkText: {
    color: 'white'
  }
})
