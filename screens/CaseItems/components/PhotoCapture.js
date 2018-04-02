import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import {Icon} from 'react-native-elements';
import color from '../../../assets/styles/color';

export default class PhotoCapture extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    autoFocus: Camera.Constants.AutoFocus.on,

  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  /**
   * Capture a photo
   */
  capture = async () => {
    if (this.camera){
      await this.camera.takePictureAsync().then((uri) => {

      });
    }
  };


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            ref={ ref => {this.camera = ref;} }
            style={{ 
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }} 
            type={this.state.type}
          >
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}>
              <TouchableOpacity
                onPress={this.capture}
              >
                <Icon 
                  name='ios-camera'
                  type='ionicon'
                  size='60'
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon 
                  name='ios-reverse-camera'
                  type='ionicon'
                  size='60'
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}