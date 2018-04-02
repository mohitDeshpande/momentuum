import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
import color from '../../../assets/styles/color';
//import { radius } from 'react-native-material-ripple/styles';
//Stylesheet
export default StyleSheet.create({
    

    container: {
        flex: 1,
        backgroundColor: '#f2f2f4'
    },
    image: {
        flex:1,
        width: (Dimensions.get('window').width)*.8,
        height: (Dimensions.get('window').width)*.8,
        resizeMode: 'contain'

    },
    imgParent:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    description:{
        padding: 10,

    }

});