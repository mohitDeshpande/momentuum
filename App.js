import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import CaseList from './screens/CaseList/components/CaseList';

export default class App extends React.Component {
  render() {
    return <MainNavigation/>
  }
}

const MainNavigation = TabNavigator({
  Login: {
    screen: Login
  },
  CaseList: {
    screen: CaseList
  }
});
