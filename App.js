import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import TabNavigator from './screens/CaseList/components/TabNavigator';
import CaseDetails from "./screens/CaseDetails/components/CaseDetails/CaseDetails";
import CaseUpdateForm from "./screens/CaseDetails/components/CaseDetails/CaseUpdateForm";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#2b6aa6',
  },
  headerTitleStyle:{ color: '#ffffff',textAlign: 'center',alignSelf:'center'},
};

class App extends React.Component {
  render() {
  }
}
  
export default StackNavigator({
    Home: {
      screen: CaseDetails
    },
    TabNavigator: {
      screen: CaseUpdateForm
    },
    CaseDetails: { 
      screen: CaseDetails 
    },
    CaseUpdateForm: { 
      screen: CaseUpdateForm 
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      ...defaultNavigationOptions,        
      }
    },
);