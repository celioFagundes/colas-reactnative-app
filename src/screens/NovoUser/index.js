import React, { useContext, useState, useEffect , useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../config/auth";
import { FontAwesome } from "@expo/vector-icons";
import {
  BackButton,
  BackLabel,
  Wrapper,
  Input,
  Button,
  ButtonTitle,
  Error,
} from "./style";

const NovoUser = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (auth.loading && auth.user !== null) {
      props.navigation.navigate("Main");
    }
  }, [auth.user]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail("");
        setSenha("");
        setShowError(false)
      };
    }, [])
  );

  const renderError = (error) => {
    switch (error) {
      case "auth/invalid-email":
        return "Digite um email válido";
      case "auth/weak-password":
        return "Senha fraca";
      case "auth/email-already-in-use":
        return "Email já em uso";
      default:
        return "Digite um email e uma senha ";
    }
  };

  const criarUsuario = (email,senha) =>{
    auth.createUser.createUser(email, senha)
    setShowError(true)
  }
  return (
    <Wrapper colors={["#6E99FF", "#3772ff"]}>
      <BackButton onPress={() => props.navigation.navigate("Login")}>
        <FontAwesome name="long-arrow-left" size={18} color="#fff" />
        <BackLabel>Voltar para Login</BackLabel>
      </BackButton>

      <Input
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Digite seu email"
        autoCompleteType="off"
      />
      <Input
        onChangeText={(text) => setSenha(text)}
        value={senha}
        placeholder="Digite sua senha"
      />
      {auth.createUser.createUserStatus.error !== null && showError && (
        <Error>
          {renderError(auth.createUser.createUserStatus.error.code)}
        </Error>
      )}
      <Button onPress={() => criarUsuario(email,senha)}>
        <ButtonTitle>Criar conta</ButtonTitle>
      </Button>
    </Wrapper>
  );
};

export default NovoUser;
