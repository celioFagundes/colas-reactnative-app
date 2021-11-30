import React, { useContext, useState } from "react";
import { AuthContext } from "../../config/auth";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  Wrapper,
  User,
  Username,
  LogoutButton,
  LogoutLabel,
  LogoutModal,
  ModalContainer,
  Container,
  LogoutMessage,
  ContainerBotoes,
  ConfirmarButton,
  ConfirmarLabel,
  CancelarButton,
  CancelarLabel,
} from "./style";

const Header = (props) => {
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
      <LogoutModal
        transparent={true}
        animationType="fade"
        visible={modalVisivel}
        onRequestClose={() => toggleModal(false)}
      >
        <ModalContainer>
          <Container>
            <LogoutMessage>
              Tem certeza que quer sair desta conta?
            </LogoutMessage>
            <ContainerBotoes>
              <ConfirmarButton onPress={onClickLogout}>
                <ConfirmarLabel>Sair</ConfirmarLabel>
              </ConfirmarButton>
              <CancelarButton>
                <CancelarLabel onPress={() => toggleModal(false)}>
                  Cancelar
                </CancelarLabel>
              </CancelarButton>
            </ContainerBotoes>
          </Container>
        </ModalContainer>
      </LogoutModal>
    </Wrapper>
  );
};

export default Header;
