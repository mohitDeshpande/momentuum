import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { Alert, TouchableOpacity, ActivityIndicator, AsyncStorage, StyleSheet, Text, View, TextInput, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import axios from "axios";
import colors from '../../../assets/styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/CaseDetailsStyles";
import GrowingTextInput from './GrowingTextInput';
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';
import screens from "../../../assets/config/RouteNames";

class CaseUpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caseLoaded: false,
      dataSource: [],
      updateDataJson: [],
      object: '',
      token: '',
      editable: false,
      clientId: '',
      tempcaseid: '',
      caseAssignedTo: '',
      caseNature: '',
      caseSource: '',
      deleted: '',
      timeprocess: '',
      userid: '',
      subtype: '',
      createdby: '',
      casesin: '',
      caseId: '',
      openDate: '',
      closeDate: '',
      caseCode: '',
      caseDesc: '',
      casetype: '',
      casetypes: [],
      casestatus: '',
      casestatuses: []
    };
  }

  MapData = () => {
    this.state.dataSource.map((item, i) => {
      this.setState({ caseId: item.cas.caseid });
      this.setState({ openDate: item.cas.caseOpenDate });
      this.setState({ closeDate: item.cas.caseClosedDate });
      this.setState({ caseCode: item.cas.caseCode });
      this.setState({ casetype: item.cas.casetype });
      this.setState({ casestatus: item.cas.casestatus });
      this.setState({ caseDesc: item.cas.casedescription });

      //other fields
      this.setState({ clientId: item.cas.idVoter });
      this.setState({ tempcaseid: item.cas.tempCaseId });
      this.setState({ caseSource: item.cas.caseSource });
      this.setState({ createdby: item.cas.createdby });
      this.setState({ casesin: item.cas.casesin });
      this.setState({ timeprocess: item.cas.timeprocess });
      this.setState({ userid: item.cas.userid });
      this.setState({ subtype: item.cas.subtype });
      this.setState({ deleted: item.cas.deleted });
      this.setState({ caseAssignedTo: item.cas.caseAssignedTo });
      this.setState({ caseNature: item.cas.caseNature });
    })
  }

  toggleEdit = () => {
    console.log(this.state.editable);
    this.setState({ editable: !this.state.editable });
  }

  updateData = () => {
    console.log(this.state.openDate.toString());
    if (this.state.closeDate)
      console.log(this.state.closeDate.toString());

    var obj = {};
    obj["caseOpenDate"] = this.state.openDate;
    obj["caseClosedDate"] = this.state.closeDate;
    obj["caseid"] = this.state.caseId;
    obj["caseCode"] = this.state.caseCode;
    obj["casetype"] = this.state.casetype;
    obj["casestatus"] = this.state.casestatus;
    obj["casedescription"] = this.state.caseDesc;
    obj["idVoter"] = this.state.clientId ;
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

    this.state.updateDataJson.push(obj);
    var myJson = JSON.stringify(obj);
    console.log(myJson);
    
    var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetail + this.state.caseId;
    console.debug("Initiating GET request to endpoint: " + url);

    // make the call
    axios({
      method: "PUT",
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
        if(response.status == 204)
        Alert.alert('Updated Successfully!');
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

  deleteAlert() {
    Alert.alert(
      'Delete Case ',
      'Do you want to delete this case ?',
      [
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
        {
          text: 'Yes', onPress: () => {
            console.log('Yes Pressed');
            this.deleteCase();
            this.props.nav.navigate(screens.caseList);
           //this.props.navigation.navigate(screens.caseList);
          }

        }
        ,
      ],
      { cancelable: false }
    )

  }

  async componentWillMount() {
    // Get case items from parent 
    console.log("Inside component did mount Case Items");
    // Get State for caseId       
    this.state.caseId = this.props.CaseId;
    this.state.token = await AsyncStorage.getItem("token");
    console.log("Case ID inside of Case Items is " + this.state.caseId)

    this.state.token = await AsyncStorage.getItem("token");
    var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetailById + this.state.caseId;
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
        //console.debug(response.data);
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
    if (!this.state.caseLoaded) {
      return (
        <View style={{ flex: 1, minHeight: 100, padding: 80 }}>
          <ActivityIndicator />
        </View>
      );
    }
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
              <Text style={styles.category}>Case Details</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={this.updateData}>
                  <Icon name="check-circle" size={25} style={{ paddingTop: 10 }} color={color.green.hex} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.toggleEdit}>
                  <Icon name="edit" size={25} style={{ paddingTop: 10, paddingLeft: 20 }} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.deleteAlert()}>
                  <Icon name="trash" size={25} color="#444" style={{ paddingTop: 10, paddingLeft: 20 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.details}>
              <View style={[styles.row, styles.firstRow]}>
                <Text style={styles.fieldname}>Open Date</Text>
                <DatePicker
                  disabled={!this.state.editable}
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
                <Text style={styles.fieldname}>Closed Date</Text>
                <DatePicker
                  disabled={!this.state.editable}
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
                <Text style={styles.fieldname}>Case Code</Text>
                <TextInput
                  ref="caseCode"
                  placeholder="Case Code"
                  underlineColorAndroid='#ffffff'
                  style={styles.textInput}
                  editable={this.state.editable}
                  onChangeText={(typedText) => { this.setState({ caseCode: typedText }) }}
                  value={this.state.caseCode}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.fieldname}>Case Type</Text>
                <Picker
                  enabled={this.state.editable}
                  style={styles.picker}
                  itemStyle={styles.picker}
                  selectedValue={this.state.casetype}
                  onValueChange={(typ) => this.setState({ casetype: typ })}>
                  {this.state.casetypes.map((l, i) => { return <Picker.Item value={l.id} label={l.listtext} key={i} /> })}
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={styles.fieldname}>Case Status</Text>
                <Picker
                  enabled={this.state.editable}
                  style={styles.picker}
                  itemStyle={styles.picker}
                  selectedValue={this.state.casestatus}
                  onValueChange={(sta) => this.setState({ casestatus: sta })}>
                  {this.state.casestatuses.map((l, i) => { return <Picker.Item value={l.id} label={l.listtext} key={i} /> })}
                </Picker>
              </View>
              <View style={styles.row}>
                <Text style={styles.fieldname}>Description</Text>
                <GrowingTextInput
                  minHeight={80}
                  placeholder="Description"
                  underlineColorAndroid='#ffffff'
                  style={styles.textInput}
                  editable={this.state.editable}
                  onChangeText={(typedText) => { this.setState({ caseDesc: typedText }) }}
                  value={this.state.caseDesc}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }

  //Api Calls
  // Delete Case 
  deleteCase() {
    var url = endpoint.api.url + endpoint.api.endpoints.casesDetail.caseDetail + this.state.caseId;

    {/* Soft delete call */ }
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
        if (response.data.deleted != "false") {
          console.log("Case was soft deleted");
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
            console.debug("Invalid username and password ");
            // this.authError();
          } else {
            console.error("Invalid request sent. Status : " + error.response.status);
            // this.appError();
          }
        } else {
          console.error("Something went wrong in the request Status : " + error + " Response : " + error);
          // this.appError();
        }
      });
  }

}

export default CaseUpdateForm;