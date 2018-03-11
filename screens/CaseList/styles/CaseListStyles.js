import { StyleSheet } from "react-native";

export default StyleSheet.create({
    
  container: {
    flex: 1,
    marginBottom: 40,
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
  padding: 50
},
button: {
    backgroundColor: "rgba(55, 111, 146, 1)",
    width: null,
    height: 50,
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 3,
    marginBottom: 50,
  },

});
