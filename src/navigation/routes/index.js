import * as screens from '@stravels/screens'

export default {
  Login: {
    screen: screens.Login,
    path: 'login',
    navigationOptions: {
      header: null
    }
  },
  // TravelsList: {
  //   screen: screens.TravelsList,
  //   path: 'travels',
  //   navigationOptions: {
  //     title: 'My Travels'
  //   }
  // },
  SelectActivities: {
    screen: screens.SelectActivities,
    path: 'select-activities',
    navigationOptions: {
      title: 'Select Activities'
    }
  },
  // TravelOverview: {
  //   screen: screens.TravelOverview,
  //   path: 'travel/overview',
  //   navigationOptions: {
  //     title: 'Overview'
  //   }
  // }
  // Main: {
  //   screen: MainNavigator,
  //   navigationOptions: {
  //     header: null
  //   }
  // }
}
