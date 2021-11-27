import React, { useContext, useState, useEffect , useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../config/auth";
import { View, Text, TextInput } from "react-native";
import {
  Wrapper,
  Input,
  Button,
  ButtonTitle,
  NovaConta,
  Link,
  Error,
} from "./style";
const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (auth.user !== null) {
      props.navigation.navigate("Loading");
    }
  },[auth.user]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowError(false)
      };
    }, [])
  );
  const renderError = (error) => {
    switch (error) {
      case "auth/invalid-email":
        return "Digite um email válido";
      case "auth/wrong-password":
        return "Senha incorreta";
      default:
        return "Digite um email e uma senha ";
    }
  };

  const loginUser = (email,senha) =>{
    auth.login.login(email, senha)
    setShowError(true)
  }
  return (
    <Wrapper colors={["#6E99FF", "#3772ff"]}>
      <Text></Text>
      <Input
        autoCompleteType="off"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Digite seu email"
      />
      <Input
        autoCompleteType="off"
        onChangeText={(text) => setSenha(text)}
        value={senha}
        placeholder="Digite sua senha"
        secureTextEntry={true}
      />
      {auth.login.loginStatus !== null &&  showError && (
        <Error>
          {renderError(auth.login.loginStatus.code)}
        </Error>
      )}
      <Button onPress={() => loginUser(email, senha)}>
        <ButtonTitle>Entrar</ButtonTitle>
      </Button>

      <NovaConta>
        Não possui uma conta ?{" "}
        <Link onPress={() => props.navigation.navigate("NovoUser")}>
          Criar uma conta
        </Link>
      </NovaConta>
    </Wrapper>
  );
};

export default Login;
