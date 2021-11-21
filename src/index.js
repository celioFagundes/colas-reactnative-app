import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        style="dark"
        backgroundColor={ '#fff'}
        translucent={false}
      />
      <Navigation />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
