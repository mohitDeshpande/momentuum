import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundImage: {
        backgroundColor: "#ccc",
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
    },
    container : {
        paddingLeft: 25,
        paddingRight: 25, 
        paddingTop:100,
    },
    formGroup: {
        paddingTop: 30,
    },
    labelStyles: {
        color: 'white'
    },
    button: {
        backgroundColor: 'rgba(60, 244, 244, 1)',
        width: null,
        height: 60, 
        borderRadius: 3
    }
});