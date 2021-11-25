import React  from "react";
import { AuthProvider } from "./config/auth";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./Navigation";
import Login from "./screens/Login";
import NovoUser from "./screens/NovoUser";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={"#fff"} translucent={false} />
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='NovoUser' component={NovoUser} />
          <Stack.Screen name="Main" component={Navigation} />
      
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
