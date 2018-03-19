import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

export default class AddCase extends React.Component{
  constructor(props) {
    super(props);
  }

   render() {
     const { params } = this.props.navigation.state;
     const clientId = params.clientId;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{clientId}</Text>
      </View>
    );
  }
}
