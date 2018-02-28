import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

export default class Test extends React.Component{
  constructor(props) {
    super(props);
  }

/* componentDidMount() {
      this.state.caseid = this.props.navigation.state.params.caseid1;

      console.log("in test:" + this.state.caseid);
    }*/
   render() {
     const { params } = this.props.navigation.state;
    const caseid = params ? params.caseid1 : "u";
     console.log("Test + " + caseid);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{caseid}</Text>
      </View>
    );
  }
}
