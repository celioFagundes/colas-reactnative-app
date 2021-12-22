import styled from "styled-components/native";
import { Sombra } from "../../styles/geral";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 2 + 'px';

export const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const ModalBox = styled.View`
  height: ${windowHeight};
  width: ${windowWidth};
  justify-content: center;
  align-items: center;
  padding:20px;
  background-color: #f8f9fb;
  ${Sombra}
`;


export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin:5px;
`;

export const Mensagem = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align:center;
  margin:0 5px;
`;
export const InputCodigo = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.3)',
})`
text-align:center;
align-self:center;
  padding: 10px;
  font-size: 18px;
  width: 70%;
  background-color: #fff;
  border-radius: 10px;
  margin: 15px 0;
  ${Sombra}
  
`;