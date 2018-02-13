import React from "react";
import styles from "./../styles/LoginStyles";
import { KeyboardAvoidingView, ImageBackground,Image, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { Constants } from 'expo';
import axios from 'axios'
import config from './../../../assets/config/endpoint'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
    }

    loginUser () {
        axios.post(config.api.url + config.api.endpoints.login, JSON.stringify(this.state))
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }


  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./../img/login.jpg')}
      >
        <KeyboardAvoidingView
            backgroundColor='transparent'
            style={styles.container}
            behavior='padding'
        >
        <Image
            source={require('./../../../assets/img/CivicTrack-Logo.png')}
        />
          <FormLabel style={styles.formGroup} labelStyle={styles.labelStyles}>
            Username
          </FormLabel>
          <FormInput 
            inputStyle={styles.inputStyle}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
        />

          <FormLabel style={styles.formGroup} labelStyle={styles.labelStyles}>
            Password
          </FormLabel>
          <FormInput 
            secureTextEntry 
            inputStyle={styles.inputStyle}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
          <Button
            title="LOGIN"
            style={styles.formGroup}
            buttonStyle={styles.button}
            onPress={this.loginUser}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}