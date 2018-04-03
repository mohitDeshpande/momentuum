import React, {
    Component, PropTypes
  } from 'react';
  import ReactNative, {
    View, Text, StyleSheet, TouchableHighlight
  } from 'react-native';
  import { Button } from 'react-native-elements';
  import SignaturePad from 'react-native-signature-pad';
  import routes from "./../../../assets/config/RouteNames";
  import styles from "../styles/SignatureDisclaimer";
  
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
        render = () => {
     const { params } = this.props.navigation.state;
     this.state.cid = params.cid1;
          return (
             this.state.show ? 

            <View style={{flex: 1}}>
            <SignaturePad onError={this._signaturePadError}
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
                onPress={this.addSignature())}
                title='Save  ' />
                </TouchableHighlight>
            </View>
            </View>
            : null 
          )
        };

        _signaturePadChange = ({base64DataUrl}) => {
           this.state.signature = base64DataUrl;
            //console.log("new state.signature: " + this.state.signature);
          };


        _signaturePadError = (error) => {
            console.error(error);
          };
  
          _reset = () => {
          this.setState({ show: false }); 
          setTimeout( () => { this.setState({ show: true }); }, 1);
          };
      }
      
  async addSignature() {
    this.state.token = await AsyncStorage.getItem("token");
    var url = config.api.url + config.api.endpoints.caseDetail.addSignature;

    // make the call
    axios({
      method: "post",
      url: url,
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: JSON.stringify({
        Case_id: this.state.cid,
        SignatureData: this.state.signature,
      })
    })
      .then(async response => {
       console.log("added");
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

  }