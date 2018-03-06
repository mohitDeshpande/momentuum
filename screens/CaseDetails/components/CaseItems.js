import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, ListView, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import config from "./../../../assets/config/endpoint";
import styles from "./../styles/CaseItemsStyles";
import color from "./../../../assets/styles/color";

export default class TestItems1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: ''

        }
    }

    //passinf caseid of list item being clicked
    GetItem(caseitemid){
        console.log("clicked");
        this.props.navigation.navigate(
            'CaseItemDetails',
            { caseitemid :caseitemid },
          );
    }

    async componentDidMount() {
        this.state.token = await AsyncStorage.getItem("token");
        //this.state.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJzb2FpYiIsImV4cCI6MTUyMjM0MjExOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.9pOx82l-_RhlyeJU-xBKlCg4B6UlmcDjv6PdMVH9qL4";
        var url = config.api.url + config.api.endpoints.caseItems.caseItemsForCase + "37148";
        axios({
            method: "get",
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
            .then(response => {
                console.log(response.data);
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(response.data),
                });
            }
            )
            .catch(error => {
                if (error.response) {
                    // the response was other than 2xx status
                    if (error.response.status == 401) {
                        console.debug("Invalid username and password entered");
                        this.authError();
                    } else {
                        console.error("Invalid request sent. Status : " + error.response.status);
                        this.appError();
                    }
                } else {
                    console.error("Something went wrong in the request Status : " + error.response.status + " Response : " + error);
                    this.appError();
                }
            });

    }
    checkStatus() {

    }

    renderRow(rowData, sectionID) {
        return (
            <ListItem

                key={sectionID}
                //Content properties
                title={<View ><Text style={styles.title} numberOfLines={1}>Status: <Text style={styles.status}>{rowData.caseItemStatus}</Text></Text>

                    <Text style={styles.action}>Action: {rowData.caseItemAction}</Text></View>}
                subtitle={<Text style={styles.itemDesc} numberOfLines={1}>{rowData.caseItemDescription}</Text>}
                //Styling properties
                rightTitle={rowData.caseItemDate}
                //onPress={this.GetItem.bind(this, 2)}
                rightTitleStyle={styles.itemDate}
                chevronColor={color.primaryColor.hex}
                containerStyle={styles.container}

            />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <List containerStyle={{ marginBottom: 20 }}>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}

                        
                    />

                </List>
            </View>
        );
    }
}