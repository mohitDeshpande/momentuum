import React, { Component } from 'react';
import { Text, View, AsyncStorage, TouchableHighlight } from 'react-native';
import styles from "../styles/CaseDetailsStyles";
import { Card, Button } from "react-native-elements"; // 0.19.0
import { Ionicons } from "@expo/vector-icons"; // 6.2.2
import routes from "./../../../assets/config/RouteNames";

export default class Disclaimer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cid: '',
    }
  }

   render() {
     const { params } = this.props.navigation.state;
     this.state.cid = params.caseid1;
    return (
        <View>
             <View style={[styles.header]}>
             <Text style={[styles.category, styles.clientHeader]}>Disclaimer</Text>
        </View>

            
            <View style={{alignSelf: "stretch"}}>
            <Text style={{marginBottom: 10, alignSelf: "stretch", textAlign: "center"}}>
            The information on this application is true and correct to the best of my knowledge. 
            I authorize the person to whom this application is delivered to obtain my credit report from any credit-reporting 
            agency and to contact my current or previous landlord and/or employer(s) to establish or verify my financial 
            standing. 
            I understand that the disclosure of my SIN is optional and will only be used to verify that the credit report 
            request is accurately matched up with the correct data contained my credit history file. This information will be
            used strictly for the purposes of verifying information pursuant to entering into or renewing a tenancy agreement.
            My information will be held in the strictest confidence.
            </Text>
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'center', alignItems: 'center'  }}>
                <TouchableHighlight>
                <Button
                icon={{name: 'close'}}
                backgroundColor='red'
                buttonStyle={{marginLeft: 4, borderRadius: 2, width: 100}}
                onPress={() => this.props.navigation.navigate(routes.caseDetails)}
                title='Decline' />
                </TouchableHighlight>

                <TouchableHighlight>
                <Button
                icon={{name: 'create'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 2, width: 100}}
                onPress={() => this.props.navigation.navigate(routes.sign,
                  { cid1: this.state.cid })}
                title='Sign' />
                </TouchableHighlight>
            </View>

      </View>
    );
  }
}
