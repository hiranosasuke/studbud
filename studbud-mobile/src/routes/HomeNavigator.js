import { createBottomTabNavigator } from "react-navigation";
import Colors from "../../constants/Colors";
import { HomeScreen } from "../screens";
import { SearchScreen } from "../screens";
import { ProfileScreen } from "../screens";

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Search: {
      screen: SearchScreen
    },
    /*Notifications: {
    screen: NotificationsScreen
  },*/
    Profile: {
      screen: ProfileScreen,
      headerTitle: "Title",
      headerColor: Colors.$navigationTint
    }
  },
  {
    tabBarOptions: {
      drawUnderTabBar: false,
      showLabel: false,
      showIcon: true,
      //activeTintColor: '#e91e63',
      activeTintColor: Colors.$navigationTint,
      labelStyle: {
        fontSize: 12
      }
      /*style: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.$navigationTint,
    }*/
    },
    tabBarPosition: "bottom"
  }
);
