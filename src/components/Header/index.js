import React, { useContext, useEffect } from "react";
import { LogoutButton, LogoutLabel, User, Username, Wrapper } from "./style";
import { AuthContext } from "../../config/auth";

const Header = (props) => {
  const auth = useContext(AuthContext);

  const onClickLogout = async () => {
    await auth.logout();
  
  };
  return (
    <Wrapper>
      <User>
        <Username>{auth. user && auth.user.email}</Username>
      </User>
      <LogoutButton onPress={onClickLogout}>
        <LogoutLabel>Sair</LogoutLabel>
      </LogoutButton>
    </Wrapper>
  );
};

export default Header;
