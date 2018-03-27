import React from 'react';
import { AsyncStorage, Text, ScrollView, View, TextInput, StatusBar, Picker, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Constants } from 'expo';
import endpoint from "../../../assets/config/endpoint";
// import CaseUpdateForm from "./CaseUpdateForm";
import styles from "../styles/CreateCaseItemStyles";
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import GrowingTextInput from './GrowingTextInput';
import { StackNavigator } from 'react-navigation';
import axios from "axios";
// import Ripple from 'react-native-material-ripple';
import Spinner from 'react-native-loading-spinner-overlay';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import screens from "../../../assets/config/RouteNames";


var url = endpoint.api.url + endpoint.api.endpoints.caseItems.caseItem;

var statuses = t.enums({
    close: "close",
    open: "open"
  });
var Form = t.form.Form;
var CaseItem = t.struct({
    details:t.String,
    action:t.maybe(t.String),
    status:t.maybe(statuses),
    assigned:t.maybe(t.String),
    description:t.maybe(t.String),
});
const detailsStyle = {
    ...Form.stylesheet,
    textbox: {
        normal: {
            height: 150,
            color: '#000',
            fontSize: 17,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 7,
            borderRadius: 4,
            borderColor: '#cccccc',
            borderWidth: 1,
            marginBottom: 5 
        },
      },
  };

  var options = {
      fields: {
          details: {
              label: 'Details:',
              error: 'This is a required field'
          },
          action: {
            label: 'Action:',
        },
        status: {
            label: 'Status:',
        },
        description: {
            label: 'Description:',
            multiline: true,
            stylesheet: detailsStyle,
        },
        assigned: {
            label: 'Assign To:'
        }
      }
  };

class CreateCaseItem extends React.Component {

    static navigationOptions = {
        title: 'Create Case Item',	
        headerMode: 'screen',		
        tabBarVisible: false		
    };

    constructor(props) {
        super(props);
        this.state = {
            caseItem: {},
            CaseId: '',
            token: '',
            editMode: false,
            spinnerVisible: false,            
        };
    }
    

    async componentDidMount() {
        const { params } = this.props.navigation.state;
        this.state.CaseId = params ? params.CaseId : "null";
        console.log("Create Case Test + " + this.state.CaseId);
        this.state.token = await AsyncStorage.getItem("token");
        // this.state.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJzb2FpYiIsImV4cCI6MTUyMjM0MjExOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.9pOx82l-_RhlyeJU-xBKlCg4B6UlmcDjv6PdMVH9qL4";
        this.setState({ options });
    }
    async save(value) {      
        this.setState({ spinnerVisible: true });
        let data= {
            "caseItemDescription": value.description,
            "caseItemStatus": value.status,
            "caseItemDetail": value.details,
            "caseItemAction": value.action,
            "caseItemAssigned": value.assigned,
            // "caseItemDate": this.state.caseItem.caseItemDate,
            // "caseItemFollowUpdate": null,
            // "caseid": this.state.caseItem.caseid,
            // "deleted": this.state.caseItem.deleted,
            // "intId": this.state.caseItem.intId,
            // "timeProcess": this.state.caseItem.timeProcess,
            // "userId": this.state.caseItem.userId,
        };
        // console.log("Data: ", data);
        axios({
            method: "post",
            url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            },
            data
        })
            .then(async response => {
                this.setState({ spinnerVisible: false });
                setTimeout(() => {
                    Alert.alert("Save Successful");
                  }, 100);                
               
                //Insert Navigation Code
                this.props.navigation.navigate(screens.caseDetails, { caseid1: this.state.CaseId });
            })
            .catch(error => {
                this.setState({ spinnerVisible: false });                
                setTimeout(() => {
                    Alert.alert("Save Unsuccessful");
                  }, 100);
                console.debug(error);
            });
    }
    cancel() {
        //handle navigation here
    }
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            this.save(value);
        console.log('value: ', value); 
        }
      }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }} style={[{ display: 'none' }, this.state.spinnerVisible && {display: 'flex'}]}>
                    <Spinner visible={this.state.spinnerVisible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
               <KeyboardAwareScrollView
                    keyboardDismissMode="on-drag"
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{ paddingVertical: 0 }}
                    style={{ flex: 0.84, padding: 10 }}
               >
                <Form type={CaseItem} ref={c => this._form = c} options={this.state.options} />
                </KeyboardAwareScrollView>
                <View style={{ flex: 0.1, flexDirection:'column' }}>
                    <TouchableOpacity style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                            <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNeutral} onPress={this.cancel} underlayColor='#99d9f4'>
                            <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
                
                <StatusBar barStyle="light-content" /> 
                </View>
        );
    }
}

export default CreateCaseItem;
