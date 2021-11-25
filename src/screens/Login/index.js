import React, { useContext, useState ,useEffect} from "react";
import { AuthContext } from "../../config/auth";
import { View, Text, Button, TextInput } from "react-native";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  
  useEffect(() =>{
    if (auth.user !== null) {
      props.navigation.navigate("Main");
    }
  })
  return (
    <View style={{ padding: 20 }}>
     <Text>
        
        {auth.login.loginStatus.code !== null &&
          auth.login.loginStatus.code}
      </Text>
      <Text>{email}</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{ borderColor: "#000", borderWidth: 1 }}
      />
      <TextInput
        onChangeText={(text) => setSenha(text)}
        value={senha}
        style={{ borderColor: "#0ff", borderWidth: 1 }}
      />
      <Button
        title="Login"
        onPress={() => auth.login.login(email, senha)}
      />
      <Text>Criar uma conta</Text>
      <Button
        title="novo user"
        onPress={() => props.navigation.navigate('NovoUser')}
      />
    </View>
  );
};

export default Login;
