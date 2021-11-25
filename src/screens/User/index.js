import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../config/auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Button,
} from "react-native";
import { Wrapper } from "../../styles/styles";

const Config = (props) => {
  const auth = useContext(AuthContext);

  if(auth.user === null){
    props.navigation.navigate('Login')
  }
  return (
    <Wrapper>
      <Button title="logout" onPress={auth.logout} />
    </Wrapper>
  );
};

export default Config;
