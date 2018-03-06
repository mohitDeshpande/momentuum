import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import TabNavigator from './screens/CaseList/components/TabNavigator';
import CaseDetails from "./screens/CaseDetails/components/CaseDetails";
import CaseItems from "./screens/CaseDetails/components/CaseItems";
import CaseItemDetails from "./screens/CaseItemDetails/components/CaseItemDetails";
import Integrate from "./screens/CaseDetails/components/Integrate";
import ClientDetails from "./screens/CaseDetails/components/ClientDetails";
import FormGenerator from "./screens/CaseDetails/components/FormGenerator";
import TestCaseDetails from "./screens/CaseDetails/components/TestCaseDetails";
import CaseUpdateForm from "./screens/CaseDetails/components/CaseUpdateForm";
import color from "./assets/styles/color"

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: color.primaryColor.hex,
  },
  headerTitleStyle:{ color: color.white.hex,textAlign: 'center',alignSelf:'center'},
};

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
    CaseDetails: { 
      screen: Integrate 
    },
    CaseUpdateForm: { 
      screen: CaseUpdateForm 
    },
    CaseItemDetails: { 
      screen: CaseItemDetails 
    },
    CaseItems: { 
      screen: CaseItems 
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      ...defaultNavigationOptions,        
      }
    },
);
