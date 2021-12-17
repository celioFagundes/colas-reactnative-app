import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 4 + 'px';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px 15px 0 15px;
`;
export const ContainerPerguntas = styled.View`
  flex: 3;
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
  margin-left: 5px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleSelect = styled.TouchableOpacity``;

export const Lista = styled.View``;
export const IconsContainer = styled.View`
  flex-direction: row;
`;
export const BoxPergunta = styled.View`
  margin: 15px 0;
`;

export const Pergunta = styled.TouchableOpacity`
  background-color: ${(props) => (props.selecionada ? '#1545B3' : '#3772ff')};
  padding: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: ${(props) => (props.expandido ? '0px' : '8px')};
  border-bottom-left-radius: ${(props) => (props.expandido ? '0px' : '8px')};
`;
export const TextoPergunta = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const BoxResposta = styled.View`
  height: ${(props) => (props.expandido ? 'auto' : '0')};
  overflow: hidden;
`;
export const Resposta = styled.TouchableOpacity`
  background-color: #b5cbff;
  padding: 20px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;
export const TextoResposta = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const Icon = styled.View`
  position: absolute;
  top: 20px;
  right: 10px;
`;
export const Acoes = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
`;

export const Excluir = styled.TouchableOpacity`
  margin: 10px;
  margin-right: 0px;
`;
export const Editar = styled.TouchableOpacity`
  margin: 10px;
  margin-right: 0px;
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

export const Input = styled.TextInput`
  padding: 10px;
  font-size: 18px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin: 5px 0;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
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
export const IconeSelecao = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const LabelCompartilhar = styled.Text`
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)'};
  font-size: 18px;
  font-weight: bold;
  margin-left: 5px;
`;
