import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { TabNavigator, TabBarBottom } from 'react-navigation'; // 1.0.0-beta.27
import CaseList from './CaseList';
import Test from './Test';
import Test1 from './Test1';

export default TabNavigator(
  {
    CaseList: {screen: CaseList},
    Test: { screen: Test },
    Test1: { screen: Test1 },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'CaseList') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Test') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }else if (routeName === 'Test1') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3385ff',
      inactiveTintColor: '#3385ff',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
