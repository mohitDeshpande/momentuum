import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, TextInput, ScrollView, Picker, KeyboardAvoidingView, FlatList } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/CaseDetailsStyles";
import GrowingTextInput from './GrowingTextInput';
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';

class ClientDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientLoaded: false,
            dataSource: [],
            token: '',
            firstName: '',
            lastName: '',
            caseId: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            workArea: '',
            workPhone: '',
            email: '',
            status: ''
        };
    }

    MapData = () => {
        this.state.dataSource.map((item, i) => {
            console.log(item.cas.casetype);
            this.setState({ firstName: item.cli.firstName });
            this.setState({ lastName: item.cli.lastname });
            this.setState({ caseId: item.cas.caseid });
            this.setState({ address1: item.cli.ruralAddress1 });
            this.setState({ address2: item.cli.ruralAddress2 });
            this.setState({ city: item.cli.city });
            this.setState({ state: item.cli.state });
            this.setState({ workArea: item.cli.workArea });
            this.setState({ workPhone: item.cli.workPhone });
            this.setState({ email: item.cli.email });
            this.setState({ status: item.cli.status });
        })
    }

    async componentDidMount() {

        // Get case items from parent 
        console.log("Inside component did mount Case Items");
        // Get State for caseId       
         this.state.caseId=this.props.CaseId;
         this.state.token = await AsyncStorage.getItem("token");
         console.log("Case ID inside of Case Items is "+this.state.caseId)

        var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetailById + this.state.caseId;
        console.debug("Initiating GET request to endpoint: " + url);

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
                    clientLoaded:true
                });
                this.MapData();
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
        if (!this.state.clientLoaded) {
            return (
                <View style={{ flex: 1, minHeight: 100 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                        <View>
                            {/* Client Session */}
                            {/* Client Header */}
                            {/* Client details */}
                            <View style={styles.details}>
                                <View style={styles.clientFirstRow}>
                                    <Text style={styles.clientName}><Icon name="user" size={14} color={color.gray.hex} />  {this.state.firstName + " " + this.state.lastName}</Text>
                                    <Text><Icon name="hashtag" size={14} color={color.gray.hex} /> {this.state.caseId}</Text>
                                </View>
                                <View style={styles.clientRow}>
                                    <Text><Icon name="laptop" size={14} color={color.gray.hex} /> {this.state.status}</Text>
                                </View>
                                <View style={styles.clientRow}>
                                    <Text style={styles.clienttext}><Icon name="address-card" size={14} color={color.gray.hex} /> {this.state.address1} {this.state.address2}, {this.state.city}, {this.state.state}</Text>
                                </View>
                                <View style={styles.clientRow}>
                                    <Text><Icon name="phone" size={14} color={color.gray.hex} /> {this.state.workArea} - {this.state.workPhone}</Text>
                                    <Text><Icon name="envelope-open" size={12} color={color.gray.hex} /> {this.state.email}</Text>
                                </View>
                            </View>
                            {/* Client Session Ends */}
                        </View>
            </View>
        )
    }
}

export default ClientDetails;