import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 0.1,
    paddingHorizontal: 10.0,
    paddingVertical: 3.0
  },
  title: {
    color: '$whiteColor',
    fontSize: 25,
    //fontFamily: 'montserrat'
  },
  contentContainer: {
    flex: 1,
    width: null,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  meetupCard: {
    flex: 1,
    width: 320,
    marginVertical: 5,
    marginHorizontal: 2,
    justifyContent: 'center',
    backgroundColor: '$mediumBlue',
    height: 125,
    borderWidth: 2,
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
  },
  groupCard: {
    flex: 1,
    width: '90%',
  }
});

export default styles;
