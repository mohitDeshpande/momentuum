import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { AsyncStorage, StyleSheet, Text, View, TextInput, ScrollView, Picker, KeyboardAvoidingView } from 'react-native';
import axios from "axios";
import colors from '../../../assets/styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/CaseDetailsStyles";
import GrowingTextInput from './GrowingTextInput';
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';

class CaseUpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      token: '',
      passcaseid: '',
      editable: false,
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

  MapData = () => {
    this.state.dataSource.map((item, i) => {
      console.log(item.cas.casetype);
      this.setState({openDate:item.cas.caseOpenDate});
      this.setState({closeDate:item.cas.caseClosedDate});
      this.setState({caseCode:item.cas.caseCode});
      this.setState({casetype:item.cas.casetype});
      this.setState({casestatus:item.cas.casestatus});
      this.setState({caseDesc:item.cas.casedescription});
    })
  }

  toggleEdit = () => {
    console.log(this.state.editable);
    this.setState({ editable: !this.state.editable });
  }

  updateData = () => {
    console.log(this.ref.caseCode.value);
    console.log(this.ref.caseType.value);
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
              <Icon name="check-circle" size={25} style={{ paddingTop: 10 }} color={color.green.hex} onPress={this.updateData} />
              <Icon name="edit" size={25} style={{ paddingTop: 10, paddingLeft: 20 }} color="#666" onPress={this.toggleEdit} />
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
                onDateChange={(date) => {this.setState({openDate: date})}}
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
                onDateChange={(date) => {this.setState({closeDate: date})}}
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
                onChangeText={this.handleChangeText}
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
                value={this.state.caseDesc}
              />
            </View>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

export default CaseUpdateForm;