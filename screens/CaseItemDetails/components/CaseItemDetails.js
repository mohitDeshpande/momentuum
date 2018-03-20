import React from 'react';
import { Alert, AsyncStorage, Text, ScrollView, View, TextInput, StatusBar, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView, Button, FlatList, Image } from 'react-native';
import { Constants } from 'expo';
import endpoint from "../../../assets/config/endpoint";
import styles from "../styles/CaseItemDetailsStyle"
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import GrowingTextInput from './GrowingTextInput';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
//import Ripple from 'react-native-material-ripple';

class CaseItemDetails extends React.Component {
    // static toggleEdit =() => {
    //     this.setState({ editMode: true });
    //     console.log(" state: ", this.state);
    // }
    
    static navigationOptions = {
        title: 'Case Item',
        headerLeft: (
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <Icon name="angle-left" size={25} color="#fff" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
            </View>
        ),
    };
    
    constructor(props) {
        super(props);
        this.state = {
            caseItem: [],
            token: '',
            editMode: false,
            caseItemActionCurrent:'',
            caseItemDescriptionCurrent:'',
            caseItemDetailsCurrent:'',
            caseItemStatusCurrent:'', 
            caseItemId:"",
            
        };
    }
    deleteAlert(){
        Alert.alert(
            'Delete Case Item',
            'Do you want to delete this case item?',
            [
              {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => 
              {
                console.log('Yes Pressed');
                this.deleteCaseItem();
                this.props.navigation.navigate('CaseDetails',{ caseid1 :this.state.caseItem.caseid });
             }
                
              }
              ,
            ],
            { cancelable: false }
          )

    }
    deleteCaseItem(){
        var url = endpoint.api.url + endpoint.api.endpoints.caseItems.caseItem + this.state.caseItemId;
       
            {/* Soft delete call*/}
            axios({
                method: "delete",
                url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                }
            })
                .then(async response => {
                    console.debug(
                        'Call was successful for delete. Response status : ' + response.status
                    );
                    if (response.data.deleted!="false"){
                        console.log("Item was soft deleted");
                    }
                  
                    console.debug(response.data);
                    this.setState({
                        caseItem: response.data
                    });
                })
                .catch(error => {
                    if (error.response) {
                        // the response was other than 2xx status
                        if (error.response.status == 401) {
                            console.debug("Invalid username and password entered");
                           // this.authError();
                        } else {
                            console.error("Invalid request sent. Status : " + error.response.status);
                           // this.appError();
                        }
                    } else {
                        console.error("Something went wrong in the request Status : " + error.response.status + " Response : " + error);
                       // this.appError();
                    }
                });


    }
   
    async componentDidMount() {
        const { params } = this.props.navigation.state;
        this.state.caseItemId = params ? params.CaseItemId : "null";
        console.log("Test + " + this.state.caseItemId);
        this.state.token = await AsyncStorage.getItem("token");
        //this.state.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5MDkwIiwiZXhwIjoxNTIzODIwMDEzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyJ9.kIREt48cIMC18UbWpVldqPQAt3OFfpcj8770zNTW1rE';

        var url = endpoint.api.url + endpoint.api.endpoints.caseItems.caseItem + this.state.caseItemId;
        console.debug('Initiating GET request to endpoint: ' + url);

        console.debug(this.state.token);
        // make the call
        axios({
            method: "get",
            url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
            .then(async response => {
                console.debug(
                    'Call was successful for get case item. Response status : ' + response.status
                );
                console.debug(response.data);
                this.setState({
                    caseItem: response.data
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

    toggleEdit() {
        this.setState({ editMode: !this.state.editMode });

        this.toggleReturn();
    }

    toggleReturn() {
        if (!this.state.editMode) {
            this.actionInput.setNativeProps({ text: this.state.caseItem.caseItemAction });
            this.descriptionInput.setNativeProps({ text: this.state.caseItem.caseItemDescription });
            this.detailInput.setNativeProps({ text: this.state.caseItem.caseItemDetail });
            this.statusInput.setNativeProps({ text: this.state.caseItem.caseItemStatus });
        }
    }
    render() {
        const caseItem = this.state.caseItem;
        return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.category, { justifyContent: 'flex-start' }]}>Case Item Details</Text>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Text style={[{ display: 'none' }, this.state.editMode && { display: 'flex', paddingHorizontal: 10 }]}>Editing</Text>
                <TouchableOpacity>
                <Icon name="edit" size={25} color="#444" onPress={() => this.toggleEdit()} style={[styles.editButton, this.state.editMode && styles.editButtonActive]} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="trash" size={25} color="#444" style={styles.deleteButton} onPress={() => this.deleteAlert()}  />
                </TouchableOpacity>
               
                
            </View>   
                        
            </View>
                <ScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ paddingVertical: 0 }}
                    style={{ flex: 0.84, }}
                >
                    
                    <View style={styles.details}>
                        <View style={[styles.row, styles.firstRow]}>
                            <Text style={styles.fieldname}>Date</Text>
                            <TextInput
                                placeholder="Open Date"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={false}
                                value={caseItem.caseItemDate}
                                
                            />
                        </View> 
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Action</Text>
                            <TextInput
                                placeholder="Action"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={this.state.editMode}
                                onChangeText={(text) => this.setState({caseItemActionCurrent: text })}
                                defaultValue={caseItem.caseItemAction}
                                selectTextOnFocus={true}
                                ref={(ref) => this.actionInput = ref}
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Description</Text>
                            <TextInput
                                placeholder="Description"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={this.state.editMode}
                                onChangeText={(text) => this.setState({caseItemActionCurrent: text })}
                                defaultValue={caseItem.caseItemDescription}
                                selectTextOnFocus={true}
                                ref={(ref) => this.descriptionInput = ref}                                
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Created By:</Text>
                            <TextInput
                                placeholder="Created By"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={false}
                                value={caseItem.createdBy}
                                selectTextOnFocus={true}
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Updated In:</Text>
                            <TextInput
                                placeholder="Last Update Date"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={false}
                                value={caseItem.updatedDate}
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Status:</Text>
                            <TextInput
                                placeholder="Status"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={this.state.editMode}
                                defaultValue={caseItem.caseItemStatus}
                                onChangeText={(text) => this.setState({caseItemStatusCurrent: text })}                                
                                selectTextOnFocus={true}
                                ref={(ref) => this.statusInput = ref}                                
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.fieldname}>Details:</Text>
                            <TextInput
                                placeholder="Details"
                                underlineColorAndroid='#ffffff'
                                style={styles.textInput}
                                editable={this.state.editMode}
                                defaultValue={caseItem.caseItemDetail}
                                onChangeText={(text) => this.setState({caseItemDetailsCurrent: text })}                                
                                selectTextOnFocus={true}
                                ref={(ref) => this.detailInput = ref}                                
                            />
                        </View>   
                    </View>
                    
                </ScrollView>
                <StatusBar barStyle="light-content" />
                </View>
                
        );
    }
}

export default CaseItemDetails;