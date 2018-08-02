import Colors from "./Colors";
import { Platform } from "react-native";

export default {
  authTitle: {
    fontSize: 35,
    color: Colors.$mediumBlue,
    backgroundColor: "transparent",
    fontFamily:
      Platform.OS === "ios" ? "AppleSDGothicNeo-Thin" : "sans-serif-medium",
    //fontFamily: "Roboto",
    //fontWeight: "bold"
    fontWeight: "400"
  },
  authWelcomeTitle: {
    fontSize: 24,
    fontFamily:
      Platform.OS === "ios" ? "AppleSDGothicNeo-Thin" : "sans-serif-medium",
    backgroundColor: "transparent",
    color: Colors.$darkBlue
  },
  FancyText: {
    color: Colors.$navigationTint,
    fontSize: 18,
    fontFamily:
      Platform.OS === "ios" ? "AppleSDGothicNeo-Thin" : "sans-serif-medium"
  },
  authWelcomeText: {
    fontSize: 16,
    fontFamily:
      Platform.OS === "ios" ? "AppleSDGothicNeo-Thin" : "sans-serif-medium",
    color: Colors.$darkBlue,
    backgroundColor: "transparent",
    textAlign: "center",
    width: "70%"
  }
};
