import React from "react";
import { 
    View,
    Text
} from "react-native";
import {
    Avatar,
    Button
} from "react-native-elements"
import axios from "axios";
import config from "./../../../assets/config/endpoint";
import constants from "./../../../assets/config/constants";

export default class Profile extends React.Component {
  render() {
    return (
      <View>
        <Avatar
          xlarge
          rounded
          icon={{name:'person', type:'MaterialIcons '}}
        />
        <Text>Christina Quon</Text>
        <Button 
            title='LOGOUT'
        />
      </View>
    );
  }
}
