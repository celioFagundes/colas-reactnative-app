import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import User from "./screens/User";
import CriarItems from "./screens/CriarItems";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Criar"
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: "#f8f9fb",
          borderTopColor: "rgba(0,0,0,0.3)",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? "#3772ff" : "rgba(0,0,0,0.3)"}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Criar"
        component={CriarItems}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="plus"
              color={focused ? "#3772ff" : "rgba(0,0,0,0.3)"}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name="gear"
              color={focused ? "#4361ee" : "rgba(0,0,0,0.3)"}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
