import React, {
    Component, PropTypes
  } from 'react';
  
  import ReactNative, {
    View, Text, StyleSheet, TouchableHighlight
  } from 'react-native';

  import { Button } from 'react-native-elements';
  
  import SignaturePad from 'react-native-signature-pad';
  
  export default class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            signature: '',
        }
    }
        render = () => {
          return (
             this.state.show ? 
            <View style={{flex: 1}}>
                    <SignaturePad onError={this._signaturePadError}
                    onChange={this._signaturePadChange}
                    style={{flex: 1, backgroundColor: 'white'}}/>
                <View 
                style={{ 
                    flexDirection: 'row', 
                paddingTop: 20, 
                justifyContent: 'center', 
                alignItems: 'center', 
                paddingBottom: 20  }}>

                <TouchableHighlight>
                <Button
                backgroundColor='red'
                buttonStyle={{margin: 4, borderRadius: 2, width: 100}}
                onPress={() => this._reset()}
                title='Reset' />
                </TouchableHighlight>

                <TouchableHighlight>
                <Button
                backgroundColor='#03A9F4'
                buttonStyle={{margin: 4, borderRadius: 2, width: 120}}
                onPress={() => this._saveSignature()}
                title='Save' />
                </TouchableHighlight>
            </View>
            </View>
            : null 
          )
        };

        _signaturePadChange = ({base64DataUrl}) => {
           this.state.signature = base64DataUrl;
            console.log("new state.signature: " + this.state.signature);
          };

        _saveSignature = () => {
            console.log("final " + this.state.signature);
        };

        _signaturePadError = (error) => {
            console.error(error);
          };
  
          _reset = () => {
          this.setState({ show: false }); 
          setTimeout( () => { this.setState({ show: true }); }, 1);
          };
      }