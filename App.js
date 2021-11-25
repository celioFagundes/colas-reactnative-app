import React from "react";
import App from "./src";
import AuthProvider from "./src/config/auth";
export default function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
