import styled from "styled-components/native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width - 30 + "px";
const windowHeight = Dimensions.get("window").height / 4 + "px";

export const Wrapper = styled.View`
  height: 30px;
  background-color: #fff;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const User = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.Text`
  margin-left: 6px;
  color: #6e99ff;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const LogoutLabel = styled.Text`
  color: #000;
  margin-left: 4px;
`;
export const LogoutModal = styled.Modal``;
export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.View`
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: #6e99ff;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const LogoutMessage = styled.Text`
  color: #fff;
`;
export const ContainerBotoes = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:10px;
`;
export const CancelarButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  background-color: #FF5154;
  border-radius: 8px;
  margin-left: 15px;
  width:80px;
`;
export const CancelarLabel = styled.Text`
  color: #fff;
  margin-left: 4px;
`;
export const ConfirmarButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  justify-content: center;
  background-color: #f8f9fb;
  border-radius: 8px;
  width:80px;
`;
export const ConfirmarLabel = styled.Text`
  color: #000;
  margin-left: 4px;
`;
