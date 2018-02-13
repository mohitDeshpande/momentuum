import React from "react";
import styles from "./../styles/LoginStyles";
import { View, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     container : {
//         paddingLeft: 25,
//         paddingRight: 25
//     }
// });
