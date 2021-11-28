import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../config/auth";
import { BackHandler, Button ,Text} from "react-native";
import { Wrapper } from "../../styles/styles";

const Config = (props) => {
  const auth = useContext(AuthContext);

  
  return (
    <Wrapper>
      <Text> {JSON.stringify(auth.user)}</Text>
     
      <Button title="logout" onPress={onClickLogout} />
    </Wrapper>
  );
};

export default Config;
