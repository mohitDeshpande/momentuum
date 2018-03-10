import React, { Component } from 'react';
import {List, ListItem, SearchBar} from 'react-native-elements'; // 0.19.0
import {FlatList, StyleSheet, Text, View, Picker, AsyncStorage} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from "axios"; // 0.17.1
import config from "./../../../assets/config/endpoint";
//const KEYS_TO_FILTERS = ['cli.lastname', 'cli.firstName']

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
//passing caseid of list item being clicked
GetItem (caseid1) {
  this.props.navigation.navigate(
    'Test',
    { caseid1 :caseid1 },
  );
}
//passing caseid of list item being clicked
SearchClients () {
  this.props.navigation.navigate(
    'Test',
  );
}

async componentDidMount() {
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


  render() {

        return (
          
          <View style={styles.container}>
         <SearchBar
          lightTheme
          onChangeText={this.filterClients.bind(this)}
          placeholder='Type Here...' />

      <View style={{flexDirection: 'row', paddingTop: 20}}>
      <Text style={{paddingLeft: 7, fontSize: 16, fontWeight: 'bold'}}> Case Type: </Text>
      <Text style={{paddingLeft: 93, fontSize: 16, fontWeight: 'bold'}}> Case Status: </Text>
      </View>

      <View style={{flexDirection: 'row'}}>
      <Picker style={{width: 156, height: 36}} itemStyle={{height: 36, fontSize: 13}}>
      <Picker.Item label="Appointment" value="appointment" />
      <Picker.Item label="Assessment" value="assessment" />
      </Picker>
      <Picker style={{width: 156, height: 36, marginLeft: 30}} itemStyle={{height: 36, fontSize: 13}}>
      <Picker.Item label="Case status" value="appointment" />
      <Picker.Item label="case status1" value="assessment" />
      </Picker>
      </View>

      <List>
      {this.state.noData ? <View><Text style={styles.nodata}>No cases found</Text>
      <Button
      title="Search client"
      style={styles.formGroup}
      buttonStyle={styles.button}
      //onPress={this.loginUser}
      //loading={this.state.isLoading}
    /></View>:
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
                      item.cas.casestatus === 'Open' ? styles.subtitleGreen :
                      item.cas.casestatus === 'Pending' ? styles.subtitleOrange :
                      item.cas.casestatus === 'Scheduled' ? styles.subtitleBlue :
                      styles.subtitleNeutral}>
                     {item.cas.casestatus} </Text>}
                      onPress={this.GetItem.bind(this, item.cas.caseid)}

                   />}
             />
          }
        </List>
      </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingBottom: 40,
   },
  title: {
    fontSize: 16,
    padding: 5,
    color : 'grey',
    fontWeight: 'bold',
  },
  subtitleGreen: {
    color: '#33cc33',
    paddingTop: 5,
  },
  subtitleOrange: {
    color: '#ff9933',
    paddingTop: 5,
  },
  subtitleBlue: {
    color: '#3399ff',
    paddingTop: 5,
  },
  subtitleRed: {
    color: '#ff3300',
    paddingTop: 5,
  },
  subtitleNeutral: {
    color: '#999966',
    paddingTop: 5,
  },
  rightT: {
    fontSize: 12,
    paddingTop: 5,
    color: '#595959',
  },
  searchBar: {
    paddingLeft: 30,
  fontSize: 22,
  height: 100,
  flex: .1,
  borderWidth: 9,
  borderColor: '#E4E4E4',
},
nodata: {
  textAlign: 'center', 
    fontWeight: '100',
    fontSize: 18,
    padding: 40
}

});
