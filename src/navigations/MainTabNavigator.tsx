import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import RootStackNavigator from "./HomeStackNavigator";
import { Feather } from "@expo/vector-icons";

type Props = {};

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC<Props> = ({}) => {
  const tabBarOptions = {
    activeTintColor: "#900",
    inactiveTintColor: "#999",
  };

  // const screenOptions = ({ route }) => {
  //   tabBarIcon: ({ focused, color, size }) => {
  //     let iconName;
  //     if (route.name === "Home") {
  //     }
  //   };
  // };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={RootStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
