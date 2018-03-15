import React from "react";
import { 
    View,
    Text
} from "react-native";
import {
    Avatar,
    Button,
    List,
    ListItem
} from "react-native-elements"
import axios from "axios";
import config from "./../../../assets/config/endpoint";
import constants from "./../../../assets/config/constants";
import styles from "../styles/ProfileStyles"

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      totalCases:0,
      openCases:0,
      pendingCases:0,
      closedCases:0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          xlarge
          rounded
          icon={{name:'ios-person', type:'ionicon'}}
        />
        <Text>{this.state.name}</Text>
        <List>
          <ListItem 
            key={1}
            title={"Total Assigned Cases"}
            badge={{ value: this.state.totalCases }}
          />
          <ListItem 
            key={2}
            title={"Total Open Cases"}
            badge={{ value: this.state.openCases }}
          />
          <ListItem 
            key={3}
            title={"Total Pending Cases"}
            badge={{ value: this.state.pendingCases }}
          />
          <ListItem 
            key={4}
            title={"Total Pending Cases"}
            badge={{ value: this.state.closedCases }}
          />
        </List>
        <Button 
            title='LOGOUT'
        />
      </View>
    );
  }
}
