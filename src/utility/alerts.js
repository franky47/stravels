import { Alert } from 'react-native'

export const confirmLogout = (onConfirm, onDismiss = () => {}) => {
  const buttons = [
    {
      text: 'Cancel',
      onPress: onDismiss,
      style: 'cancel'
    },
    {
      text: 'Log Out',
      onPress: onConfirm,
      style: 'destructive'
    }
  ]
  const options = { onDismiss } // Andoid can dismiss by tapping outside.
  Alert.alert('Log out', 'Are you sure ?', buttons, options)
}
