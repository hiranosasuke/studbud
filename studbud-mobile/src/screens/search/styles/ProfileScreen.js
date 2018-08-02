import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    height: 300,
    justifyContent: "center"
    //backgroundColor: '$lightBlue'
  },
  contentContainer: {
    flex: 1,
    width: null,
    //justifyContent: 'center',
    alignItems: "center",
    paddingBottom: 5
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 0.6,
    marginBottom: 5
  },
  groupCard: {
    flex: 0.9,
    width: "90%"
  },
  loc: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between"
    //height: 15,
    //backgroundColor: "blue"
    //fontSize: 12
    //paddingBottom: 2,
    //marginBottom: 2,
    //paddingTop: 0,
    //marginTop: 0
  },
  input: {
    backgroundColor: "rgba(105, 105, 105, 0.25)",
    width: 300,
    height: 40,
    marginHorizontal: 5,
    paddingLeft: 10,
    //padding: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  inputWrapper: {
    flex: 0.1,
    paddingBottom: 40,
    paddingTop: 10,
    paddingLeft: 10
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
});

export default styles;
