import React from 'react';
import { Text, ScrollView, View, TextInput, StatusBar, TouchableHighlight, KeyboardAvoidingView, Button, FlatList, Image } from 'react-native';
import { Constants } from 'expo';
import endpoint from "../../../assets/config/endpoint";
import CaseUpdateForm from "./CaseUpdateForm";
import styles from "../styles/CaseDetailsStyles"
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import GrowingTextInput from './GrowingTextInput';
import { StackNavigator } from 'react-navigation';
import axios from "axios";
import Ripple from 'react-native-material-ripple';

class CaseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    static navigationOptions = {
        title: 'Case Details',
        headerRight: (
            <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                <Icon name="trash" size={25} color="#fff" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
            </View>
        ),
        headerLeft: (
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <Icon name="angle-left" size={25} color="#fff" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
            </View>
        ),
    };

    async componentDidMount() {
        //this.state.token = await AsyncStorage.getItem("token");
        var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetailById + "37148";
        console.debug("Initiating GET request to endpoint: " + url);

        //console.debug(this.state.token);
        // make the call
        axios({
            method: "get",
            url: url

        })
            .then(async response => {
                console.debug(
                    "Call was successful for login. Response status : " + response.status
                );
                console.debug(response.data);
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
                <ScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ paddingVertical: 0 }}
                    style={{ flex: 1, backgroundColor: '#f2f2f4' }}>

                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>

                            <View>
                                {/* Client Session */}
                                {/* Client Header */}
                                <View style={[styles.header]}>
                                    <Text style={[styles.category,styles.clientHeader]}>Client Details</Text>
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

                                {/* Case Session */}
                                {/* Case header */}
                                <View style={styles.header}>
                                    <Text style={styles.category}>Case Details</Text>
                                        <Icon name="edit" size={25} style={{ paddingTop: 10 }} color="#444" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
                                </View>

                                {/* Case details */}
                                <View style={styles.details}>
                                    <View style={[styles.row, styles.firstRow]}>
                                        <Text style={styles.fieldname}>Date</Text>
                                        <TextInput
                                            placeholder="Open Date"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.caseOpenDate}
                                        />
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={styles.fieldname}>Close Date</Text>
                                        <TextInput
                                            placeholder="Close Date"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.caseClosedDate}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.fieldname}>Case Code</Text>
                                        <TextInput
                                            placeholder="Case Code"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.caseCode}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.fieldname}>Case Type</Text>
                                        <TextInput
                                            placeholder="Case Type"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.casetype}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.fieldname}>Case Status</Text>
                                        <TextInput
                                            placeholder="Case Status"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.casestatus}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.fieldname}>Description</Text>
                                        <GrowingTextInput
                                            minHeight={80}
                                            placeholder="Description"
                                            underlineColorAndroid='#ffffff'
                                            style={styles.textInput}
                                            editable={false}
                                            value={item.cas.casedescription}
                                        />
                                    </View>
                                </View>
                                {/* Case Session Ends */}

                            </View>
                        }
                    />
                    {/* Case Items Session */}
                    {/* Case Items header */}
                    <View style={styles.header}>
                        <Text style={styles.category}>Case Items</Text>
                        <Icon name="plus-square" size={25} style={{ paddingTop: 10 }} color="#444" />
                    </View>

                    {/* Case Items details */}

                    {/* ///Case Items goes here/// */}

                    {/* Case Items Session Ends */}

                </ScrollView>

                <StatusBar barStyle="light-content" />
            </View>
        )
    }
}

export default CaseDetails
