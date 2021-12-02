import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 4 + 'px';

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 20px;
  background-color: #fff;
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
  margin-left: 4px;
  color: #000;
`;
export const LogoutModal = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: ${windowHeight};
  width: ${windowWidth};
  border-radius: 8px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: #f8f9fb;
`;
export const LogoutMessage = styled.Text`
  font-size: 18px;
  color: #000;
`;
export const ContainerBotoes = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 8px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const Label = styled.Text`
  font-size: 18px;
  margin-left: 4px;
  color: #fff;
`;
