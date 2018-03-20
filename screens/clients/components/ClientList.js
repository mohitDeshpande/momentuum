import React, { Component } from "react";
import { StackNavigator, SafeAreaView } from "react-navigation";
import { List, ListItem, SearchBar, Button } from "react-native-elements"; // 0.19.0
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Picker,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import SearchInput, { createFilter } from "react-native-search-filter";
import axios from "axios"; // 0.17.1
import config from "./../../../assets/config/endpoint";
import styles from "./../styles/ClientListStyles";
import { Ionicons } from "@expo/vector-icons"; // 6.2.2
import RouteNames from "../../../assets/config/RouteNames";

export default class ClientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: [],
      renderedListData: [],
      token: "",
      noData: false,
      fisrtState: true
    };
  }
  //load always renderedlistdata in flatlist while ontextchange it's going
  // to be filtered and returned to the initial state if there's no text on the search bar
  async filterClients(e) {
    console.disableYellowBox = true;
    this.state.token = await AsyncStorage.getItem("token");
    var url = config.api.url + config.api.endpoints.clientlist + e;
    console.debug("Initiating GET request to endpoint: " + url);
    //console.debug(this.state.token);

    // make the call
    axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(async response => {
        console.debug(
          "Call was successful for client list. Response status : " +
            response.status
        );
        this.setState({
          dataSource: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          // the response was other than 2xx status
          if (error.response.status == 401) {
            console.debug("Invalid username and password entered");
            this.authError();
          } else {
            console.error(
              "Invalid request sent. Status : " + error.response.status
            );
            this.appError();
          }
        } else {
          console.error(
            "Something went wrong in the request Status : " +
              error.response.status +
              " Response : " +
              error
          );
          this.appError();
        }
      });
  }

  //passing clientid of list item being clicked
  GetItem(id) {
    this.props.navigation.navigate("ClientDetails", { clientId: id });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this.filterClients.bind(this)}
          placeholder="Type Here..."
        />

        {!this.state.dataSource ? (
          <View>
            <Text style={styles.nodata}>No clients found</Text>
            <Button
              title="Add client"
              buttonStyle={styles.button}
              onPress={() => this.props.navigation.navigate(RouteNames.addClient)}
              loading={this.state.isLoading}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <List>
              <FlatList
                data={this.state.dataSource}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                  <ListItem
                    title={
                      <View>
                        <Text style={styles.title}>
                          {item.firstName + " " + item.lastname}
                        </Text>
                      </View>
                    }
                    subtitle={
                      <View>
                        <View
                          style={{
                            width: 150,
                            height: 1,
                            backgroundColor: "lightgrey"
                          }}
                        />
                        <Text style={styles.rightT}>
                          {item.type === null ? "" : 
                          item.type === "" ? "" : 
                          "Type: " + item.type }</Text>

                        <Text style={styles.rightT}>
                        { item.city === null ? "" :
                          item.city === "" ? "" :
                          "City: " + item.city}</Text>
                             
                        <Text style={styles.rightT}>
                          {item.workArea === null ? "" :
                          item.workArea === "" ? "" :
                          "Work Phone: " + item.workArea + "-" + item.workPhone}</Text>
                      </View>
                    }
                    rightIcon={
                      <TouchableOpacity
                        onPress={this.GetItem.bind(this, item.id)}
                      >
                        <Ionicons
                          name={"ios-add-circle"}
                          size={40}
                          color={"#3385ff"}
                        />
                      </TouchableOpacity>
                    }
                    rightTitle={
                      <Text style={styles.subtitleBlue}>Add Case</Text>
                    }
                  />
                )}
              />
            </List>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
