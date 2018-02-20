import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    backgroundColor: "#ccc",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  container: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  formGroup: {
    paddingTop: 30
  },
  labelStyles: {
    color: "black",
  },
  inputStyle: {
    color: "black",
  },
  button: {
    backgroundColor: "rgba(55, 111, 146, 1)",
    width: null,
    height: 50,
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 3,
  }
});
