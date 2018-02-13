import React from "react";
import styles from "./../styles/LoginStyles";
import { KeyboardAvoidingView, ImageBackground,Image } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

export default class Login extends React.Component {
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
          <FormInput />

          <FormLabel style={styles.formGroup} labelStyle={styles.labelStyles}>
            Password
          </FormLabel>
          <FormInput secureTextEntry />

          <Button
            title="LOGIN"
            style={styles.formGroup}
            buttonStyle={styles.button}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

// const styles = StyleSheet.create({
//     container : {
//         paddingLeft: 25,
//         paddingRight: 25
//     }
// });
