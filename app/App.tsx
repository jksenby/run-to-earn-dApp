import React, { memo } from "react";
import { Navigation } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./MainScreen";
import MapScreen from "./MapScreen";
import ProfileScreen from "./ProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMap } from "@fortawesome/free-solid-svg-icons/faMap";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

type Props = {
  navigation: Navigation;
};

const Tab = createBottomTabNavigator();

const App = ({ navigation }: Props) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={MainScreen}
      options={{
        tabBarIcon: () => <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarIcon: () => <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: () => <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default memo(App);
