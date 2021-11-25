
import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { AuthContext } from "../../config/auth";

const NovoUser = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (auth.user !== null) {
    props.navigation.navigate("Main");
  }
  return (
    <View style={{ padding: 20 }}>
      <Text>
        {" "}
        {auth.createUser.createUserStatus.error.code !== "" &&
          auth.createUser.createUserStatus.error.code}
      </Text>
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
        title="novo user"
        onPress={() => auth.createUser.createUser(email, senha)}
      />
    </View>
  );
};

export default NovoUser;
