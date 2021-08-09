import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import { Feather } from "@expo/vector-icons";

type Props = {};

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC<Props> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#900",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
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
