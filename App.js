import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import TabNavigator from './screens/CaseList/components/TabNavigator';

class App extends React.Component {
  render() {
  }
}
export default StackNavigator({
  Home: {
    screen: Login
  },
  TabNavigator: {
    screen: TabNavigator
  },
});
