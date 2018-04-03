import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { Alert, TouchableOpacity, ActivityIndicator, Button, AsyncStorage, StyleSheet, Text, View, TextInput, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import axios from "axios";
import colors from '../../../assets/styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/CaseDetailsStyles";
import GrowingTextInput from '../../CaseDetails/components/GrowingTextInput';
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';
import screens from "../../../assets/config/RouteNames";

class AddCase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      addDataJson: [],
      object: '',
      token: '',
      clientId: '',
      tempcaseid: '',
      caseAssignedTo: '',
      caseNature: '',
      caseSource: '',
      deleted: 'false',
      timeprocess: '',
      userid: '',
      subtype: '',
      createdby: '',
      casesin: '',
      openDate: '',
      closeDate: '',
      caseCode: '',
      caseDesc: '',
      casetype: '',
      casetypes: [
        {
          "id": "Appointment",
          "listtext": "Appointment",
          "code": "234"
        },
        {
          "id": "POC Exception",
          "listtext": 'POC Exception',
          "code": "1234"
        },
        {
          "id": "Email",
          "listtext": 'Email',
          "code": "124"
        }
      ],
      casestatus: '',
      casestatuses: [
        {
          "id": "Pending",
          "listtext": "Pending",
          "code": "23"
        },
        {
          "id": "Scheduled",
          "listtext": 'Scheduled',
          "code": "43"
        }
      ]
    };
  }

  static navigationOptions = {
    title: 'Add Case',	
    headerMode: 'screen',		
    tabBarVisible: true		
  };

  async componentWillMount() {
    const { params } = this.props.navigation.state;
    this.state.clientId = params ? params.clientId : "error";
    console.log(this.state.clientId);
    this.state.token = await AsyncStorage.getItem("token");
    //this.getCaseDetails();
  }

  addData = () => {
    console.log(this.state.openDate.toString());
    if (this.state.closeDate)
      console.log(this.state.closeDate.toString());

    var obj = {};
    obj["caseOpenDate"] = this.state.openDate;
    obj["caseClosedDate"] = this.state.closeDate;
    obj["caseCode"] = this.state.caseCode;
    obj["casetype"] = this.state.casetype;
    obj["casestatus"] = this.state.casestatus;
    obj["casedescription"] = this.state.caseDesc;
    //obj["idVoter"] = this.state.clientId ;
    obj["tempCaseId"] = this.state.tempcaseid ;
    obj["caseSource"] = this.state.caseSource ;
    obj["createby"] = this.state.createdby ;
    obj["casesin"] = this.state.casesin ;
    obj["timeprocess"] = this.state.timeprocess ;
    obj["userid"] = this.state.userid ;
    obj["subtype"] = this.state.subtype ;
    obj["deleted"] = this.state.deleted ;
    obj["caseNature"] = this.state.caseNature ;
    obj["caseAssignedTo"] = this.state.caseAssignedTo ;

    this.state.addDataJson.push(obj);
    var myJson = JSON.stringify(obj);
    console.log(myJson);
    
    var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetail;
    console.debug("Initiating GET request to endpoint: " + url);

    // make the call
    axios({
      method: "POST",
      url: url,
      data: myJson,
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
        if(response.status == 201)
        Alert.alert('Added Successfully!');
        this.props.navigation.navigate(screens.caseList);
        //console.debug(response.data);
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
      })
  }

  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingVertical: 0 }}
          style={{ flex: 1, backgroundColor: '#f2f2f4' }}>
          <KeyboardAvoidingView
            backgroundColor="transparent"
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
            behavior={"position"}>
            <View style={styles.header}>
              <Text style={styles.category}>Case Form</Text>
              
            </View>
            <View style={styles.details}>
              <View style={[styles.row, styles.firstRow]}>
                <Text style={[styles.fieldname, styles.firstElement]}>Open Date</Text>
                <DatePicker
                  style={styles.secondElement}
                  mode="date"
                  date={this.state.openDate}
                  placeholder="select open date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      height: 30,
                      borderWidth: 0
                    }
                  }}
                  onDateChange={(date) => { this.setState({ openDate: date }) }}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.fieldname, styles.firstElement]}>Closed Date</Text>
                <DatePicker
                  style={styles.secondElement}
                  mode="date"
                  date={this.state.closeDate}
                  placeholder="select closed date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      height: 30,
                      borderWidth: 0
                    }
                  }}
                  onDateChange={(date) => { this.setState({ closeDate: date }) }}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.fieldname, styles.firstElement]}>Case Code</Text>
                <TextInput
                  ref="caseCode"
                  placeholder="Case Code"
                  underlineColorAndroid='#ffffff'
                  style={[styles.textInput, styles.secondElement]}
                  onChangeText={(typedText) => { this.setState({ caseCode: typedText }) }}
                  value={this.state.caseCode}
                />
              </View>
              <View style={styles.row}>
                <Text style={[styles.fieldname, styles.firstElement]}>Case Type</Text>
                <Picker
                  style={[styles.picker, styles.secondElement]}
                  itemStyle={styles.picker}
                  selectedValue={this.state.casetype}
                  onValueChange={(typ) => this.setState({ casetype: typ })}>
                  {this.state.casetypes.map((l, i) => { return <Picker.Item value={l.id} label={l.listtext} key={i} /> })}
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={[styles.fieldname, styles.firstElement]}>Case Status</Text>
                <Picker
                  style={[styles.picker, styles.secondElement]}
                  itemStyle={styles.picker}
                  selectedValue={this.state.casestatus}
                  onValueChange={(sta) => this.setState({ casestatus: sta })}>
                  {this.state.casestatuses.map((l, i) => { return <Picker.Item value={l.id} label={l.listtext} key={i} /> })}
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={[styles.fieldname, styles.firstElement]}>Description</Text>
                <GrowingTextInput
                  minHeight={80}
                  placeholder="Description"
                  underlineColorAndroid='#ffffff'
                  style={[styles.textInput, styles.secondElement]}
                  onChangeText={(typedText) => { this.setState({ caseDesc: typedText }) }}
                  value={this.state.caseDesc}
                />
              </View>
              <Button
              title="SAVE"
              style={styles.button}
              onPress={this.addData}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }

  //Api Calls
  

}

export default AddCase;