import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {List, ListItem, SearchBar, Button} from 'react-native-elements'; // 0.19.0
import {FlatList, StyleSheet, Text, View, Picker, AsyncStorage} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from "axios"; // 0.17.1
import config from "./../../../assets/config/endpoint";
import styles from "./../styles/CaseListStyles";

export default class CaseList extends Component<{}> {
  constructor(props)
  {
    super(props);

    this.state = {
    isLoading: false,
    dataSource: [],
    renderedListData: [],
    token: '',
    noData: false,
    typeStatus: false,
  }

  }
  //load always renderedlistdata in flatlist while ontextchange it's going
  // to be filtered and returned to the initial state if there's no text on the search bar
  filterClients(e){
    let text = e.toLowerCase()
    let fullList = this.state.dataSource;
    let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
      if(item.cli.lastname.toLowerCase().match(text) || item.cli.firstName.toLowerCase().match(text))
        return item;
    })
    if (!text || text === '') {
      this.setState({
        renderedListData: fullList,
        noData:false,
      })
    } else if (!filteredList.length) {
     // set no data flag to true so as to render flatlist conditionally
       this.setState({
         noData: true
       })
    }
    else if (Array.isArray(filteredList)) {
      this.setState({
        noData: false,
        renderedListData: filteredList
      })
    }
  }
  filterCases(e){
    console.debug("entered");
    let text = e.toLowerCase();
    let fullList = this.state.dataSource;
    let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
      if(item.cas.casestatus.toLowerCase().match(text) || item.cas.casetype.toLowerCase().match(text))
        return item;
    })
    if (!text || text === '') {
      this.setState({
        renderedListData: fullList,
        typeStatus:false,
      })
    } else if (!filteredList.length) {
     // set no data flag to true so as to render flatlist conditionally
       this.setState({
        typeStatus: true
       })
    }
    else if (Array.isArray(filteredList)) {
      this.setState({
        typeStatus: false,
        renderedListData: filteredList
      })
    }
  }
//passing caseid of list item being clicked
GetItem (caseid1) {
  this.props.navigation.navigate(
    'CaseDetails',
    { caseid1 :caseid1 },
  );
}
//search from all clients
/*
SearchClient () {
  navigation.navigate('ClientList');
}*/

async componentDidMount() {
    console.disableYellowBox = true;
    this.state.token = await AsyncStorage.getItem("token");
    var url =  config.api.url + config.api.endpoints.caselist;
    //console.debug("Initiating GET request to endpoint: " + url);
    //console.debug(this.state.token);

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
          //console.debug("Call was successful for case list. Response status : " + response.status);
            this.setState({
              dataSource: response.data,
              renderedListData: response.data,
            });
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
            console.error("Something went wrong in the request Status : " + error.response.status + " Response : "+ error);
            this.appError();
          }
        });

    }
    loadCaseTypes() {
      return this.state.dataSource.map(type => (
        
         <Picker.Item label={type.cas.casetype} value={type.cas.casetype} />
      ))
    }
    loadCaseStatuses() {
      return this.state.dataSource.map(st => (
        <Picker.Item label={st.cas.casestatus} value={st.cas.casestatus} />
     ))
    }

  render() {

        return (
          
          <View style={styles.container}>
         <SearchBar
          lightTheme
          onChangeText={this.filterClients.bind(this)}
          placeholder='Type Here...' />

          {this.state.noData ? <View><Text style={styles.nodata}>No cases found</Text>
          <Button
          title="Search client"
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate('ClientList')}
          loading={this.state.isLoading}
        /></View>
        :
<View style={styles.container}>
      <View style={{flexDirection: 'row', paddingTop: 20}}>
      <Text style={{paddingLeft: 23, fontSize: 16, fontWeight: 'bold'}}> Case Type: </Text>
      <Text style={{paddingLeft: 93, fontSize: 16, fontWeight: 'bold'}}> Case Status: </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
      <Picker 
          onValueChange={this.filterCases.bind(this)}
          style={{width: 156, height: 56, marginLeft: 20}} itemStyle={{height: 56, fontSize: 13}}>
      {this.loadCaseTypes()}
      </Picker>
      <Picker 
          onValueChange={this.filterCases.bind(this)}
          style={{width: 156, height: 56, marginLeft: 25}} itemStyle={{height: 56, fontSize: 13}}>
      {this.loadCaseStatuses()}
      </Picker>
      </View>

      <List>
      
           <FlatList
              data={ this.state.renderedListData }
              keyExtractor={(item, index) => index}
              renderItem={({item}) =>
                   <ListItem

                    title={
                     <View>
                       <Text style={styles.title}>{item.cli.firstName + " " + item.cli.lastname}</Text>
                     </View>
                         }

                     subtitle={
                       <View>
                       <View style={{width: 150, height: 1, backgroundColor: 'lightgrey'}} />
                       <Text style={styles.rightT}>{item.cas.casetype + " | Updated: " + item.cas.updateddate}</Text>
                      </View>
                     }

                     rightTitle={
                     <Text style={
                      item.cas.casestatus === 'Open' ? styles.subtitleBlue :
                      item.cas.casestatus === 'Pending' ? styles.subtitleRed :
                      item.cas.casestatus === 'Scheduled' ? styles.subtitleGreen :
                      item.cas.casestatus === 'Closed' ? styles.subtitleYellow :
                      styles.subtitleNeutral}>
                     {item.cas.casestatus} </Text>}
                      onPress={this.GetItem.bind(this, item.cas.caseid)}

                   />}
             />
          
        </List>
        </View>
        }
      </View>
        );
  }
}