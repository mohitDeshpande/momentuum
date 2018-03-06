import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { AsyncStorage, StyleSheet, Text, View, TextInput, ScrollView, Picker, KeyboardAvoidingView, FlatList } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/CaseDetailsStyles";
import GrowingTextInput from './GrowingTextInput';
import DatePicker from 'react-native-datepicker';

class ClientDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            token: '',
            passcaseid: ''
        };
    }

    async componentDidMount() {

        this.state.token = await AsyncStorage.getItem("token");
        //this.state.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJzb2FpYiIsImV4cCI6MTUyMjM0MjExOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.9pOx82l-_RhlyeJU-xBKlCg4B6UlmcDjv6PdMVH9qL4";

        var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetailById + "37148";
        console.debug("Initiating GET request to endpoint: " + url);

        console.debug(this.state.token);
        // make the call
        axios({
            method: "get",
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
            .then(async response => {
                console.debug(
                    "Call was successful for login. Response status : " + response.status
                );
                console.debug(response.data);
                this.setState({
                    dataSource: response.data,
                });
            })
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

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>

                        <View>
                            {/* Client Session */}
                            {/* Client Header */}
                            <View style={[styles.header]}>
                                <Text style={[styles.category, styles.clientHeader]}>Client Details</Text>
                            </View>

                            {/* Client details */}
                            <View style={styles.details}>
                                <View style={styles.clientFirstRow}>
                                    <Text style={styles.clientName}>{item.cli.firstName + " " + item.cli.lastname}</Text>
                                    <Text>#{item.cas.caseid}</Text>
                                </View>
                                <View style={styles.clientRow}>
                                    <Text style={styles.clienttext}>{item.cli.addressLine1} {item.cli.addressLine2}</Text>
                                </View>
                                <View style={styles.clientRow}>
                                    <Text>{item.cli.mainPhone}</Text>
                                    <Text>{item.cli.email}</Text>
                                </View>
                            </View>
                            {/* Client Session Ends */}

                        </View>
                    }
                />
            </View>
        )
    }
}

export default ClientDetails;