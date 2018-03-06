import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import TabNavigator from './screens/CaseList/components/TabNavigator';
import CaseDetails from "./screens/CaseDetails/components/CaseDetails";
import CaseItemDetails from "./screens/CaseItemDetails/components/CaseItemDetails";
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
      screen: CaseItemDetails
    },
    TabNavigator: {
      screen: TabNavigator
    },
    CaseDetails: { 
      screen: CaseDetails 
    },
    CaseUpdateForm: { 
      screen: CaseUpdateForm 
    },
    CaseItemDetails: {
      screen: CaseItemDetails
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      ...defaultNavigationOptions,        
      }
    },
);
