import React from "react";
import { View } from "react-native";
import { Avatar, Button, List, ListItem, Text } from "react-native-elements";
import axios from "axios";
import config from "./../../../assets/config/endpoint";
import constants from "./../../../assets/config/constants";
import styles from "../styles/ProfileStyles";
import colors from "../../../assets/styles/color";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Mohit Deshpande",
      totalCases: 0,
      openCases: 0,
      pendingCases: 0,
      closedCases: 0
    };
  }

  render() {
    return (
      <View>
        <View style={styles.center}>
          <Avatar
            xlarge
            rounded
            icon={{ name: "ios-person", type: "ionicon" }}
            style={styles.center}
          />
          <Text h3 style={styles.name}>{this.state.name}</Text>
        </View>
        <List>
          <ListItem
            key={1}
            title={"Total Assigned Cases"}
            hideChevron={true}
            badge={{ value: this.state.totalCases }}
          />
          <ListItem
            key={2}
            title={"Total Open Cases"}
            hideChevron={true}
            badge={{ value: this.state.openCases, containerStyle:{ backgroundColor: colors.blue.rgb } }}
          />
          <ListItem
            key={3}
            title={"Total Pending Cases"}
            hideChevron={true}
            badge={{ value: this.state.pendingCases, containerStyle:{ backgroundColor: 'orange' } }}
          />
          <ListItem
            key={4}
            title={"Total Closed Cases"}
            hideChevron={true}
            badge={{ value: this.state.closedCases }}
          />
        </List>
        <Button 
          title="LOGOUT"
          style={styles.padding}
          buttonStyle={{
            backgroundColor: colors.danger.rgb,
            borderRadius: 5
          }}
        />
      </View>
    );
  }
}
