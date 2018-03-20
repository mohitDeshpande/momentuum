import React from 'react';
import { StackNavigator } from 'react-navigation';
import tabnav from './assets/config/HomeTabs';
import Login from './screens/login/components/Login';
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
  tabnav: {
    screen: tabnav
    },

  },
  {
    headerMode: 'screen',
    navigationOptions: {
      ...defaultNavigationOptions,        
      }
    },
);
