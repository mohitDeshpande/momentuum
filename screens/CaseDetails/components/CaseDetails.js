import React from 'react';
import {
    Alert, AsyncStorage, Text, ScrollView, View,
    TextInput, Picker, StatusBar, TouchableHighlight, KeyboardAvoidingView,
    Button, FlatList, Image
} from 'react-native';
import { Constants } from 'expo';
import endpoint from "../../../assets/config/endpoint";
import CaseUpdateForm from "./CaseUpdateForm";
import CaseItems from './CaseItems';
import styles from "../styles/CaseDetailsStyles";
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import GrowingTextInput from './GrowingTextInput';
import { StackNavigator } from 'react-navigation';
import axios from "axios";
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';
import ClientDetails from './ClientDetails';

class CaseDetails extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            caseLoaded: false,
            caseItemsLoaded: false,
            dataSource: [],
            caseItemsList: [],
            token: '',
            caseId: '',
        };
    }

    static navigationOptions = {
        title: 'Case Details',
    };

    openCaseItem = (id) => {
        this.props.navigation.navigate('CaseItemDetails', { CaseItemId: id })
    }

    async componentWillMount() {
        const { params } = this.props.navigation.state;
        this.state.caseId = params ? params.caseid1 : "error";
        this.state.token = await AsyncStorage.getItem("token");
        //this.getCaseDetails();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ paddingVertical: 0 }}
                    style={{ flex: 1, backgroundColor: '#f2f2f4' }}>

                    <View>
                        {/* Client Session */}
                        <View style={[styles.header]}>
                            <Text style={[styles.category, styles.clientHeader]}>Client Details</Text>
                        </View>
                        <ClientDetails CaseId={this.state.caseId} />

                        {/* Case Session */}
                        <CaseUpdateForm CaseId={this.state.caseId} />
                    </View>

                    {/* Case Items Session */}
                    <View style={styles.header}>
                        <Text style={styles.category}>Case Items</Text>
                        <Icon name="plus-square" size={25} style={{ paddingTop: 10 }} color="#444" />
                    </View>

                    {/* Case Items details */}
                    <CaseItems CaseId={this.state.caseId} />

                </ScrollView>

                <StatusBar barStyle="light-content" />
            </View>
        )
    }

    // Api Calls
    // Get Case Detail 
    getCaseDetails() {
        var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetailById + this.state.caseId;
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
                    "Call was successful for case details. Response status : " + response.status
                );
                console.debug(response.data);
                this.setState({
                    dataSource: response.data,
                    caseLoaded: true
                });
                this.MapData();
            })
            .catch(error => {
                if (error.response) {
                    // the response was other than 2xx status
                    if (error.response.status == 401) {
                        console.debug("Invalid username and password entered");
                        // this.authError();
                    } else {
                        console.error("Invalid request sent. Status : " + error.response.status);
                        //this.appError();
                    }
                } else {
                    console.error("Something went wrong in the request Status : " + error.response.status + " Response : " + error);
                    //this.appError();
                }
            });
    }

    // Get Case Items 
    getCaseItems() {

        var url = endpoint.api.url + endpoint.api.endpoints.caseItems.caseItemsForCase + this.state.caseId;
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

                this.setState({
                    caseItemsList: response.data,
                    caseItemsLoaded: true
                });
                console.log("Case Items Data :" + response.data);
            }
            )
            .catch(error => {
                if (error.response) {
                    // the response was other than 2xx status
                    if (error.response.status == 401) {
                        console.debug("Invalid username and password entered");
                        // this.authError();
                    } else {
                        console.error("Invalid request sent. Status : " + error.response.status);
                        //this.appError();
                    }
                } else {
                    console.error("Something went wrong in the request Status : " + error + " Response : " + error);
                    //this.appError();
                }
            });
    }


}

export default CaseDetails