import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CaseDetails from "./screens/CaseDetails/components/CaseDetails/CaseDetails";
import CaseUpdateForm from "./screens/CaseDetails/components/CaseDetails/CaseUpdateForm";
import { Font } from 'expo';
import { StackNavigator } from 'react-navigation';


const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#2b6aa6',
  },
  headerTitleStyle:{ color: '#ffffff',textAlign: 'center',alignSelf:'center'},
};

export default class App extends React.Component {

  
  render() {
    return (
      <View style={styles.container}>
        <AppNavigation />
      </View>
    );
  }
}

const AppNavigation = StackNavigator(
  {
    CaseDetails: { screen: CaseDetails },
    CaseUpdateForm: { screen: CaseUpdateForm },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      ...defaultNavigationOptions,        
      }
    },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
