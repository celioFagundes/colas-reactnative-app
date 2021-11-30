import styled from 'styled-components/native';

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
`;
export const PerguntasHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleSelect = styled.TouchableOpacity``;

export const Lista = styled.View`
  
`;
export const IconsContainer = styled.View`
  flex-direction: row;
`;
export const BoxPergunta = styled.View`
  margin: 15px 0;
`;
export const Pergunta = styled.TouchableOpacity`
  background-color: #3772ff;
  padding: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: ${(props) => (props.expandido ? "0px" : "8px")};
  border-bottom-left-radius: ${(props) => (props.expandido ? "0px" : "8px")};
`;
export const TextoPergunta = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const BoxResposta = styled.View`
height: ${props => props.expandido ? 'auto' : '0'};
  overflow:hidden;
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

export const IconArrow = styled.View`
  position: absolute;
  top: 20px;
  right: 10px;
`;
export const Excluir = styled.Text`
  color : #FF5154;
  align-self:flex-end;
`;