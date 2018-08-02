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
  }
});

export default styles;
