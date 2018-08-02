import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../../../constants/Colors";

const styles2 = EStyleSheet.create({
  root: {
    flex: 1
  },
  titleContainer: {
    flex: 0.05,
    paddingHorizontal: 20.0,
    paddingBottom: 8,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: "$navigationTint",
    fontSize: 16,
    fontWeight: "bold"
    //fontFamily: 'montserrat'
  },
  contentContainer: {
    flex: 1
  },
  meetupCard: {
    height: 150,
    width: 175,
    marginHorizontal: 5,
    backgroundColor: "$mediumBlue"
  },
  meetupCardTopContainer: {
    flex: 1,
    position: "relative"
  },
  meetupCardTitle: {
    position: "absolute",
    //color: "$darkBlue",
    top: 8,
    left: 10.0
  },
  meetupCardBottomContainer: {
    flex: 0.4,
    backgroundColor: "$mediumBlue2",
    justifyContent: "center",
    paddingHorizontal: 5.0
  },
  meetupCardMetaName: {
    fontSize: 15,
    color: "$whiteColor"
  },
  meetupsCardMetaDate: {
    fontSize: 12,
    color: "$whiteColor"
  }
});

export default styles2;
