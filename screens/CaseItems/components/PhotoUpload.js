import React from "react";
import { KeyboardAvoidingView, Picker } from "react-native";
import { Camera, Permissions } from "expo";
import { FormLabel, FormInput, Button } from "react-native-elements";
import color from "../../../assets/styles/color";
import routes from '../../../assets/config/RouteNames';


export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      folder: "default",
      folders: ["default", "other", "priority"]
    };

    console.log(JSON.stringify(this.props))
  }

  upload = () => {
    this.props.navigation.navigate(routes.appScreen);
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <FormLabel>Document Name</FormLabel>
        <FormInput 
        ref={documentName => this.documentName = documentName}
        value='Img1.jpg'
        />
        <FormLabel>Folder</FormLabel>
        <Picker
          selectedValue={this.state.folder}
          onValueChange={(itemValue, itemIndex) => 
            this.setState({ folder: itemValue })
          }
        >
            <Picker.Item label='default' value='default' />
            <Picker.Item label='other' value='other' />
            <Picker.Item label='priority' value='priority' />
        </Picker>
        <Button raised title="Upload" backgroundColor={color.primaryColor.hex} onPress={this.upload} containerViewStyle={{padding: 20}}/>
        <Button raised title="Cancel" onPress={this.upload} containerViewStyle={{padding: 20}}/>
      </KeyboardAvoidingView>
    );
  }
}
