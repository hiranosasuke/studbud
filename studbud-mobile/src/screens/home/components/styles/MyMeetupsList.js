import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1
  },
  titleContainer: {
    flex: 0.1,
    paddingHorizontal: 20.0,
    paddingBottom: 8,
    paddingVertical: 5,
  },
  title: {
    color: '$whiteColor',
    fontSize: 20,
    //fontFamily: 'montserrat'
  },
  contentContainer: {
    flex: 1
  },
  meetupCard: {
    width: 175,
    marginHorizontal: 2.5,
    backgroundColor: '$mediumBlue'
  },
  meetupCardTopContainer: {
    flex: 1,
    position: 'relative'
  },
  meetupCardTitle: {
    //fontFamily: 'montserratBold',
    position: 'absolute',
    color: '$whiteColor',
    top: 8,
    left: 10.0
  },
  meetupCardBottomContainer: {
    flex: 0.4,
    backgroundColor: '$mediumBlue2',
    justifyContent: 'center',
    paddingHorizontal: 5.0
  },
  meetupCardMetaName: {
    fontSize: 15
  },
  meetupsCardMetaDate: {
    fontSize: 12,
    //fontFamily: 'montserratLight'
  }
});

export default styles;
