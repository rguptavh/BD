import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import log from './components/Login';
import barcode from './components/Barcode';

export default class AppContainer extends React.Component {
  
  render() {
      const AppNavigator = createStackNavigator({
        Login: {
          screen: log
        },
        Barcode: {
          screen: barcode
        },
      },
        {
          initialRouteName: 'Login',
          headerMode:'none'
        });

      const AppContainer = createAppContainer(AppNavigator);
      return(
      <AppContainer/>
      );
  }
}
