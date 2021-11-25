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

  
  const onClickLogout = () =>{
    auth.logout()
    props.navigation.navigate('Loading')
  }
  return (
    <Wrapper>
      <Button title="logout" onPress={onClickLogout} />
    </Wrapper>
  );
};

export default Config;
