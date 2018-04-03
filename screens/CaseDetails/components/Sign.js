import React, {
    Component, PropTypes
  } from 'react';
  import ReactNative, {
    View, Text, StyleSheet, TouchableHighlight, AsyncStorage, Dimensions
  } from 'react-native';
  import { Button } from 'react-native-elements';
  import SignaturePad from 'react-native-signature-pad';
  import routes from "./../../../assets/config/RouteNames";
  import styles from "../styles/SignatureDisclaimer";
  import config from "./../../../assets/config/endpoint";
  import axios from "axios"; // 0.17.1
  
  export default class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            signature: '',
            cid: '',
            token: '',
        }
    }
    async componentDidMount() {
      this.state.token = await AsyncStorage.getItem("token");
//      console.log("token in sign.js " + this.state.token);
    }  
    addSignature = () => {
      console.log(this.state.signature);
      console.log("ADDED ------------------------------------------------------------------------------" +
      "-------------------------------------------------------------------" + this.state.signature);
      
      var url = config.api.url + config.api.endpoints.casesDetail.addSignature;
      console.debug("Initiating POST request to endpoint: " + url);
      var state = this.state;
      state.isLoading = true;
      this.setState(state);
  
      // make the call
      axios({
        method: "post",
        url: url,
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
        },
        data: {
          Case_id: this.state.cid,
          SignatureData: this.state.signature
        }
      })
        .then(async response => {
          console.debug(
            "Signature added. Response status : " + response.status);
          console.debug(response.data);
          // this.props.navigation.navigate(routes.caseDetails);
          })
        .catch(error => {
          if (error.response) {
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
  
    };
    
        render = () => {
          const { params } = this.props.navigation.state;
          this.state.cid = params.cid1;
          return (
             this.state.show ? 

            <View style={{flex: 1}}>
            <SignaturePad 
            onError={this._signaturePadError}
            onChange={this._signaturePadChange}
            style={styles.signatureContainer}/>

                <View style={styles.buttonrow}>
                <TouchableHighlight>
                <Button
                backgroundColor='red'
                buttonStyle={styles.buttonStyle}
                onPress={() => this._reset()}
                title='Reset' />
                </TouchableHighlight>

                <TouchableHighlight>
                <Button
                backgroundColor='#03A9F4'
                buttonStyle={styles.buttonStyle}
                onPress={() => this.addSignature()}
                title='Save  ' />
                </TouchableHighlight>
            </View>
            </View>
            : null 
          )
        };

        _signaturePadChange = ({base64DataUrl}) => {
          this.state.signature = base64DataUrl;
         };
    
    
       _signaturePadError = (error) => {
           console.error(error);
         };
    
         _reset = () => {
         this.setState({ show: false }); 
         setTimeout( () => { this.setState({ show: true }); }, 1);
         };  
        
}