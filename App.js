import React from "react";
import { LogBox } from "react-native";
import App from "./src";
import AuthProvider from "./src/config/auth";
export default function Main() {
  LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes','AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
