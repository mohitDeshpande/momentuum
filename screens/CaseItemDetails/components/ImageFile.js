import React from 'react';
import endpoint from "../../../assets/config/endpoint";
import { ActivityIndicator, AsyncStorage, StyleSheet,
     Text, View, TextInput, ScrollView, Picker, 
     KeyboardAvoidingView, FlatList, Image } from 'react-native';
import axios from "axios";
import CaseItemDetails from './CaseItemDetails';
import styles from "../styles/CaseItemDetailsStyle"
import Icon from 'react-native-vector-icons/FontAwesome';
import GrowingTextInput from './GrowingTextInput';
import DatePicker from 'react-native-datepicker';
import color from '../../../assets/styles/color';

class ImageFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file:{},
            fileId:''
            
           
        };
    }


    async componentWillMount() {

        // Get case items from parent 
        console.log("Inside component will mount File Item");
        // Get State for caseId       
         this.state.file=this.props.File;
       
         this.state.token = await AsyncStorage.getItem("token");
         console.log("The file data has loaded for file: "+this.state.file.fileName);
        
    }

    render() {
       
        return (
            <View style={styles.container}>
           <Text>Description: {this.state.file.comments}</Text>
           <Text>{endpoint.api.url + endpoint.api.endpoints.fileItem.image +this.state.file.id}</Text>
           <Text>{this.state.token}</Text>
           
                       <Image
                        source={{
                            uri: endpoint.api.url + endpoint.api.endpoints.fileItem.image +this.state.file.id,
                            method: 'GET',
                            headers: {
                            Pragma: 'no-cache',
                              }
                        }}
                        style={{width: 400, height: 400}}
                        />
            </View>
        )
    }
        // Api Calls
          getFileImage(){
            
             var url = endpoint.api.url + endpoint.api.endpoints.fileItem.image +  this.state.file.fileName;
             console.log("Inside Image File Compoment Calling "+url);
             axios({
                 method: "get",
                 url: url,
                 headers: {
                     'Accept': 'image/jpeg',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + this.state.token,
                 }
             })
                 .then(response => {
                     console.log(response.data);
                    
                     this.setState({
                         isLoading: false,
                         dataSource: response.data,
                         }); 
                     console.log("Case Items Data :" + response.data);
                 }
                 )
                 .catch(error => {
                     if (error.response) {
                         // the response was other than 2xx status
                         if (error.response.status == 401) {
                             console.debug("Invalid username and password entered");
                            // this.authError();
                         } else {
                             console.error("Invalid request sent. Status : " + error.response.status);
                             //this.appError();
                         }
                     } else {
                         console.error("Something went wrong in the request Status : " +  error.response.status+ " Response : " + error);
                         //this.appError();
                     }
                 });
              }
}

export default ImageFile;