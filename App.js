import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/components/Login';
import tabnav from './assets/config/HomeTabs';


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
});
