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
      fisrtState: true,
      keys: '',
      delay: false
    };
  }

  //ontextchange calls
  // data is filtered and returned to the initial state if there's no text on the search bar
  async filterClients(e) {
    this.state.keys = e;
    console.disableYellowBox = true;
    console.debug("filtering");
    
      if (!this.state.keys == '' && !this.state.keys == ' ') {
        this.state.token = await AsyncStorage.getItem("token");
        var url = config.api.url + config.api.endpoints.clientlist + this.state.keys;
        console.debug("Initiating GET request to endpoint: " + url);
        

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
        console.log(this.state.keys);
        that.setState({ delay: false });
      }

  }

  //passing clientid of list item being clicked
  GetItem(id) {
    this.props.navigation.navigate(RouteNames.addCase, { clientId: id });
  }

  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          lightTheme
          onEndEditing={this.filterClients.bind(this)}
          containerStyle={{backgroundColor: "rgba(55, 111, 146, 1)", opacity: 0.6}}
          placeholder="Type Here..."
        />

        {!this.state.dataSource && this.state.dataSource.length < 0 ? (
          <View>
            <Text style={styles.nodata}>No clients found</Text>
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
                                "Type: " + item.type}</Text>

                          <Text style={styles.rightT}>
                            {item.city === null ? "" :
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
