import styled from "styled-components/native";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 4 + 'px';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px 15px 0 15px;
`;
export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 20px 10px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const Tab = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-weight: bold;
`;
export const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.selecionado ? "#3772ff" : "#6E99FF")};
  padding: 8px 15px;
  border-radius: 8px;
  margin-right: 10px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Placeholder = styled.Text`
  
`;
export const Excluir = styled.TouchableOpacity`
  
  align-self:flex-end;
`;

export const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const ModalBox = styled.View`
  min-height: ${windowHeight};
  height: auto;
  width: ${windowWidth};
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fb;
  border-radius: 5px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const ExcluirMensagem = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
`;

export const BoxBotoes = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
`;
export const Botao = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 8px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const BotaoLabel = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 5px;
`;