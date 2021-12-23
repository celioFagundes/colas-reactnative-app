import React, { useContext, useState } from "react";
import { AuthContext } from "../../config/auth";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ModalLogout from "../ModalExcluirELogout";
import {
  Wrapper,
  User,
  Username,
  LogoutButton,
  LogoutLabel,
} from "./style";

const Header = () => {
  const auth = useContext(AuthContext);
  const [modalVisivel, setModalVisivel] = useState(false);

  const toggleModal = (bool) => {
    setModalVisivel(bool);
  };

  const onClickLogout = async () => {
    toggleModal(false);
    await auth.logout();
  };

  return (
    <Wrapper>
      <User>
        <FontAwesome name="user-circle" size={16} color="#6E99FF" />
        <Username>{auth.user && auth.user.email.split("@")[0]}</Username>
      </User>
      <LogoutButton onPress={() => toggleModal(true)}>
        <MaterialIcons name="logout" size={16} color="black" />
        <LogoutLabel>Sair</LogoutLabel>
      </LogoutButton>
      <ModalLogout
        visible = {modalVisivel}
        message= {'Tem certeza que quer sair desta conta?'}
        confirmFunction = {onClickLogout}
        closeFunction={() => toggleModal(false)}
      />

    </Wrapper>
  );
};

export default Header;
