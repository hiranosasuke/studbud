import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "90%"
  },
  root: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: "red"
  },
  item: {
    marginVertical: "2%"
  },
  buttonCreate: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "10%"
  }
});

export default styles;
