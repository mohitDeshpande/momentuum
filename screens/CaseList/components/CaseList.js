import React, { Component } from 'react';
import {List, ListItem, SearchBar} from 'react-native-elements'; // 0.19.0
import {FlatList, StyleSheet, Text, View, Picker} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from "axios"; // 0.17.1
const KEYS_TO_FILTERS = ['cli.lastname', 'cli.firstName'];

export default class CaseList extends Component<{}> {
  constructor(props)
  {
    super(props);

    this.state = {
    isLoading: false,
    dataSource: [],
    filteredData: [],
    text: '',
  }

  }
goToCase(){

}

  componentDidMount() {
    axios
      .get(
        "http://192.168.0.14:5000/api/case/3")
        .then(({ data }) => {
          this.setState({
            dataSource: data
          });
        })
        .catch((err)=> {})
      }
      searchUpdated(term) {
         this.state.text = term;
       }
  render() {
    const filteredNames = this.state.dataSource.filter(createFilter(this.state.text, KEYS_TO_FILTERS))
    if(!this.state.text || this.state.text === ''){


        return (
          <View  style={styles.container}>
         <SearchBar
      lightTheme
      onChangeText={(term) => { this.searchUpdated(term) }}
      placeholder='Type Here...' />

      <View style={{flexDirection: 'row', paddingTop: 20}}>
      <Text style={{paddingTop: 7}}> Case Type: </Text>
      <Picker style={{width: 156, height: 36}} itemStyle={{height: 36, fontSize: 13}}>
      <Picker.Item label="Appointment" value="java" />
      <Picker.Item label="Assessment" value="js" />
      </Picker>
      </View>


      <List>
           <FlatList
              data={ this.state.dataSource }
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

                     rightTitle={"Status: "+item.cas.casestatus}

                     onPress={this.goToCase}
                   />}
             />

             </List>

      </View>
        );

  }else {


      return (
        <View  style={styles.container}>
       <SearchBar
    lightTheme
    onChangeText={(term) => { this.searchUpdated(term) }}
    placeholder='Type Here...' />

    <View style={{flexDirection: 'row', paddingTop: 20}}>
    <Text style={{paddingTop: 7}}> Case Type: </Text>
    <Picker style={{width: 156, height: 36}} itemStyle={{height: 36, fontSize: 13}}>
    <Picker.Item label="Appointment" value="java" />
    <Picker.Item label="Assessment" value="js" />
    </Picker>
    </View>


    <List>
         <FlatList
            data={ filteredNames }
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

                   rightTitle={"Status: "+item.cas.casestatus}

                   onPress={this.goToCase}
                 />}
           />

           </List>

    </View>
      );

  }
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
   },
  title: {
    fontSize: 16,
    padding: 5,
    color : 'grey',
    fontWeight: 'bold',
  },
  subtitleGreen: {
    color: '#33cc33',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  subtitleOrange: {
    color: '#ff9933',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  subtitleBlue: {
    color: '#3399ff',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  subtitleRed: {
    color: '#ff3300',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  subtitleNeutral: {
    color: '#999966',
    fontWeight: 'bold',
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

});
